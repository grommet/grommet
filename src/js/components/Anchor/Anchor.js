import React, {
  cloneElement,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { normalizeColor } from '../../utils';

import { Box } from '../Box';

import { StyledAnchor } from './StyledAnchor';

const Anchor = forwardRef(
  (
    {
      a11yTitle,
      children,
      color,
      disabled,
      href,
      icon,
      label,
      onBlur,
      onClick,
      onFocus,
      reverse,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [focus, setFocus] = useState();

    useEffect(() => {
      if ((icon || label) && children) {
        console.warn(
          'Anchor should not have children if icon or label is provided',
        );
      }
    }, [children, icon, label]);

    let coloredIcon = icon;
    if (icon && !icon.props.color) {
      coloredIcon = cloneElement(icon, {
        color: normalizeColor(color || theme.anchor.color, theme),
      });
    }

    const first = reverse ? label : coloredIcon;
    const second = reverse ? coloredIcon : label;

    return (
      <StyledAnchor
        {...rest}
        ref={ref}
        aria-label={a11yTitle}
        colorProp={color}
        disabled={disabled}
        hasIcon={!!icon}
        focus={focus}
        hasLabel={label}
        reverse={reverse}
        href={!disabled ? href : undefined}
        onClick={!disabled ? onClick : undefined}
        onFocus={event => {
          setFocus(true);
          if (onFocus) onFocus(event);
        }}
        onBlur={event => {
          setFocus(false);
          if (onBlur) onBlur(event);
        }}
      >
        {first && second ? (
          <Box
            as="span"
            direction="row"
            align="center"
            gap="small"
            style={{ display: 'inline-flex' }}
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

let AnchorDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  AnchorDoc = require('./doc').doc(Anchor);
}
const AnchorWrapper = AnchorDoc || Anchor;

export { AnchorWrapper as Anchor };
