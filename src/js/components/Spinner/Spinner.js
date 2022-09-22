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

const BasicSpinner = ({ ref, size, ...rest }) => (
  <Box flex={false} height={size} width={size} ref={ref} {...rest} />
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

    const normalizedSize = size || sizeThemeProp;
    const spinnerSize = theme.spinner.size[normalizedSize] || normalizedSize;

    const color = colorProp || colorThemeProp;
    const Icon = theme.spinner.icon;

    const defaultBorder = [
      { side: 'all', color: 'background-contrast', size },
      { side: 'top', color, size },
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

    // children will take precedence over theme attributes
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
        {...rest}
      />
    );
  },
);

Spinner.displayName = 'Spinner';
Spinner.propTypes = SpinnerPropTypes;

export { Spinner };
