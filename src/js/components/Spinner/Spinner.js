import React, {
  isValidElement,
  forwardRef,
  useContext,
  useEffect,
} from 'react';
import { ThemeContext } from 'styled-components';

import { AnnounceContext } from '../../contexts/AnnounceContext';
import { Box } from '../Box';
import { defaultProps } from '../../default-props';
import { SpinnerPropTypes } from './propTypes';
import { parseMetricToNum } from '../../utils';

const BasicSpinner = ({ ref, size, ...rest }) => (
  <Box height={size} width={size} ref={ref} {...rest} />
);
/**
 * If the user is calling <Spinner>…</Spinner> with children, it will take
 * precedence over theme styling. Yet, it will still inherit the
 * default animation and size of the spinner, and of course any additional
 * given props.
 *
 * If the user is providing an icon/svg via the theme.spinner.icon,
 * the Spinner will use it as a child and will include all its relevant
 * theme props (size/color/pad…) as well,
 * user will only need to type <Spinner />.
 * If the icon has its own animation, user can turn it off via the theme.
 *
 * If none of the above is provider, <Spinner /> will provide its default
 * border, size and friends, all configurable via theme or props.
 */
const Spinner = forwardRef(
  ({ children, color: colorProp, size, message, ...rest }, ref) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const announce = useContext(AnnounceContext);

    useEffect(() => {
      if (message?.start) announce(message.start);
      else if (typeof message === 'string') announce(message);
      return () => message?.end && announce(message.end);
    }, [announce, message]);

    // Avoid color and size leaking into the DOM
    const {
      size: sizeThemeProp,
      color: colorThemeProp,
      border: borderThemeProp,
      ...themeProps
    } = theme.spinner.container;

    const pad = theme?.spinner?.container?.pad;

    const normalizedSize = size || sizeThemeProp;
    const spinnerSize = theme.spinner.size[normalizedSize] || normalizedSize;

    const color = colorProp || colorThemeProp;
    const Icon = theme.spinner.icon;

    const defaultBorder = [
      {
        side: 'all',
        color: 'background-contrast',
        size: normalizedSize,
      },
      { side: 'top', color, size: normalizedSize },
    ];
    const spinnerBorder = Array.isArray(borderThemeProp)
      ? borderThemeProp.map((borderSide) => ({
          ...borderSide,
          color:
            borderSide.side === 'all'
              ? borderSide.color || 'background-contrast'
              : color,
        }))
      : borderThemeProp;

    // check the size of the pad plus border
    // than multiple by 2 in order to compare to it to theme sizes
    const spinnerPad = parseMetricToNum(
      theme?.global?.edgeSize && theme.global.edgeSize[pad],
    );

    let spinnerPadBorder;
    // if a user passes border as a prop we should assume they want the pad
    if (!rest.border) {
      // if  borderthemeProp is provided need to map through and use
      // the sizes given for the border
      if (borderThemeProp) {
        spinnerPadBorder = borderThemeProp.map(
          (item) =>
            2 *
            (spinnerPad +
              parseMetricToNum(
                theme?.global?.edgeSize && theme.global.borderSize[item.size],
              )),
        );
      } else {
        spinnerPadBorder =
          2 *
          (spinnerPad +
            parseMetricToNum(
              theme?.global?.edgeSize &&
                theme.global.borderSize[normalizedSize],
            ));
      }
    }

    // children will take prsecedence over theme attributes
    if (children) {
      return (
        <BasicSpinner size={spinnerSize} ref={ref} {...rest}>
          {children}
        </BasicSpinner>
      );
    }

    // In case icon is provided by the theme
    if (Icon)
      return (
        <BasicSpinner size={spinnerSize} ref={ref} {...themeProps} {...rest}>
          {/* If the icon is SVG then treat it differently than an element */}
          {isValidElement(Icon) ? (
            Icon
          ) : (
            <Icon size={spinnerSize} color={color} />
          )}
        </BasicSpinner>
      );

    return (
      <BasicSpinner
        size={spinnerSize}
        ref={ref}
        border={
          typeof borderThemeProp === 'undefined' ? defaultBorder : spinnerBorder
        }
        {...themeProps}
        // If border plus pad is larger than spinnerSize there should be no pad.
        pad={
          spinnerPadBorder > spinnerSize.replace('px', '')
            ? 'none'
            : theme.spinner.container.pad
        }
        {...rest}
      />
    );
  },
);

Spinner.displayName = 'Spinner';
Spinner.propTypes = SpinnerPropTypes;

export { Spinner };
