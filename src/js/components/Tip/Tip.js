import React, {
  Children,
  cloneElement,
  forwardRef,
  useEffect,
  useState,
} from 'react';

import { Box } from '../Box';
import { Drop } from '../Drop';
import { Keyboard } from '../Keyboard';
import { useForwardedRef, useId, useKeyboard } from '../../utils';
import { TipPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

/*
 * This function getReactNodeRef is adapted from
 * [Material UI] (https://github.com/mui/material-ui)
 * Licensed under the MIT License (c) 2024 aarongarciah
 * The function has been modified from its original version.
 */
const getReactNodeRef = (element) => {
  if (!element || !React.isValidElement(element)) {
    return null;
  }

  // 'ref' is passed as prop in React 19, whereas 'ref' is directly attached to
  // children in older versions
  return {}.propertyIsEnumerable.call(element.props, 'ref')
    ? element.props.ref
    : element.ref;
};

const Tip = forwardRef(
  ({ children, content, defaultVisible = false, dropProps, plain }, tipRef) => {
    const { theme } = useThemeValue();
    const [over, setOver] = useState(false);
    const [tooltipOver, setTooltipOver] = useState(false);
    const usingKeyboard = useKeyboard();
    const tooltipId = useId();
    const isVisible = over || tooltipOver;

    const componentRef = useForwardedRef(tipRef);

    // Three use case for children
    // 1. Tip has a single child + it is a React Element => Great!
    // 2. Tip has a single child +  not React Element =>
    // span will wrap the child so we can use ref and events.
    // 3. Tip has more than one child => Abort, display Children.only error
    const child =
      (Children.count(children) <= 1 && !React.isValidElement(children) && (
        <span>{children}</span>
      )) ||
      Children.only(children);

    // When content is a plain string, use aria-description (ARIA 1.3) to
    // provide the description inline on the trigger element. This ensures
    // screen readers always announce the tooltip content when the element
    // receives focus, without needing a referenced DOM element. It avoids
    // the "aria-describedby element ID does not exist" axe violation that
    // occurs when the tooltip Drop hasn't rendered yet.
    // When content is a React node, fall back to conditional aria-describedby.
    const isStringContent = typeof content === 'string';

    const clonedChild = cloneElement(child, {
      onMouseEnter: (event) => {
        setOver(true);
        if (child.props?.onMouseEnter) child.props.onMouseEnter(event);
      },
      onMouseLeave: (event) => {
        setOver(false);
        if (child.props?.onMouseLeave) child.props.onMouseLeave(event);
      },
      onFocus: (event) => {
        if (usingKeyboard) setOver(true);
        if (child.props?.onFocus) child.props.onFocus(event);
      },
      onBlur: (event) => {
        if (usingKeyboard) setOver(false);
        if (child.props?.onBlur) child.props.onBlur(event);
      },
      ...(isStringContent
        ? {
            // aria-description is always present for string content, so the
            // screen reader reads it at focus time without waiting for a
            // re-render. No DOM element reference needed.
            'aria-description':
              [child.props['aria-description'], content]
                .filter(Boolean)
                .join(' ') || undefined,
          }
        : {
            // For React node content, reference the tooltip Drop element.
            // Only set when visible to avoid dangling ID references (axe).
            'aria-describedby': isVisible
              ? [child.props['aria-describedby'], tooltipId]
                  .filter(Boolean)
                  .join(' ')
              : child.props['aria-describedby'],
          }),
      key: 'tip-child',
      ref: (node) => {
        // https://github.com/facebook/react/issues/8873#issuecomment-287873307
        if (typeof componentRef === 'function') {
          componentRef(node);
        } else if (componentRef) {
          componentRef.current = node;
        }
        // Call the original ref, if any
        const callerRef = getReactNodeRef(child);
        if (typeof callerRef === 'function') {
          callerRef(node);
        } else if (callerRef) {
          callerRef.current = node;
        }
      },
    });

    useEffect(() => {
      setOver(defaultVisible);
    }, [defaultVisible]);

    return [
      clonedChild,
      // Visual tooltip Drop for sighted users. For React node content, the
      // Drop also has id + role="tooltip" so aria-describedby can reference it.
      isVisible && (
        <Keyboard
          key="tip-keyboard"
          onEsc={() => {
            setOver(false);
            setTooltipOver(false);
          }}
        >
          <Drop
            target={componentRef.current}
            trapFocus={false}
            key="tip-drop"
            {...theme.tip.drop}
            {...dropProps}
            onMouseEnter={() => setTooltipOver(true)}
            onMouseLeave={() => setTooltipOver(false)}
          >
            {plain ? (
              // When plain, we wrap content in a Box using as="span" to:
              // 1. Provide a DOM target for aria-describedby when content is
              // a React node, without adding block-level layout or padding.
              // 2. Ensure string content is a valid, identifiable child within
              // the Drop.
              <Box
                as="span"
                {...(isStringContent ? {} : { id: tooltipId, role: 'tooltip' })}
              >
                {content}
              </Box>
            ) : (
              <Box
                {...(isStringContent ? {} : { id: tooltipId, role: 'tooltip' })}
                {...theme.tip.content}
              >
                {content}
              </Box>
            )}
          </Drop>
        </Keyboard>
      ),
    ];
  },
);

Tip.displayName = 'Tip';
Tip.propTypes = TipPropTypes;

export { Tip };
