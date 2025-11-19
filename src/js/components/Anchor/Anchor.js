import React, {
  cloneElement,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { findButtonParent, normalizeColor, useSizedIcon } from '../../utils';

import { Box } from '../Box';

import { StyledAnchor } from './StyledAnchor';
import { AnchorPropTypes } from './propTypes';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { TextContext } from '../Text/TextContext';
import { useThemeValue } from '../../utils/useThemeValue';

const Anchor = forwardRef(
  (
    {
      a11yTitle,
      'aria-label': ariaLabel,
      children,
      color,
      disabled,
      gap,
      href,
      icon,
      label,
      onBlur,
      onClick: onClickProp,
      onFocus,
      reverse,
      size: sizeProp,
      ...rest
    },
    ref,
  ) => {
    const { theme, passThemeFlag } = useThemeValue();
    const [focus, setFocus] = useState();
    const { size } = useContext(TextContext);
    const sendAnalytics = useAnalytics();

    const onClick = useCallback(
      (event) => {
        sendAnalytics({
          type: 'anchorClick',
          element: findButtonParent(event.target),
          event,
          href,
          label: typeof label === 'string' ? label : undefined,
        });
        if (onClickProp) onClickProp(event);
      },
      [onClickProp, sendAnalytics, label, href],
    );

    useEffect(() => {
      if ((icon || label) && children) {
        console.warn(
          'Anchor should not have children if icon or label is provided',
        );
      }
    }, [children, icon, label]);

    let coloredIcon = icon;

    if (icon) {
      // Apply color only if icon doesn't already have a color prop
      if (!icon.props.color) {
        coloredIcon = cloneElement(icon, {
          color: normalizeColor(
            color ||
              theme.anchor?.icon?.color ||
              theme.anchor?.size?.[sizeProp || size]?.color ||
              theme.anchor.color,
            theme,
          ),
        });
      }

      // Apply size if icon doesn't already have a size prop
      // (regardless of color)
      if (!icon.props.size) {
        const scaledSize = sizeProp || size || 'medium';
        coloredIcon = cloneElement(coloredIcon, {
          size: theme.anchor?.size?.[scaledSize]?.iconSize || scaledSize,
        });
      }
    }

    const anchorIcon = useSizedIcon(coloredIcon, sizeProp || size, theme);

    const first = reverse ? label : anchorIcon;
    const second = reverse ? anchorIcon : label;

    return (
      <StyledAnchor
        {...rest}
        ref={ref}
        aria-label={ariaLabel || a11yTitle}
        colorProp={color}
        disabled={disabled}
        hasIcon={!!icon}
        focus={focus}
        hasLabel={label}
        reverse={reverse}
        href={!disabled ? href : undefined}
        onClick={!disabled ? onClick : undefined}
        onFocus={
          !disabled
            ? (event) => {
                setFocus(true);
                if (onFocus) onFocus(event);
              }
            : undefined
        }
        onBlur={(event) => {
          setFocus(false);
          if (onBlur) onBlur(event);
        }}
        size={sizeProp || size}
        {...passThemeFlag}
      >
        {first && second ? (
          <Box
            as="span"
            direction="row"
            align="center"
            gap={
              gap || theme.anchor?.size?.[sizeProp]?.gap || theme.anchor?.gap
            }
            responsive={false}
          >
            {first}
            {second}
          </Box>
        ) : (
          first || second || children
        )}
      </StyledAnchor>
    );
  },
);

Anchor.displayName = 'Anchor';
Anchor.propTypes = AnchorPropTypes;

export { Anchor };
