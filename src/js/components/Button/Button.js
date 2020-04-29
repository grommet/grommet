import React, {
  cloneElement,
  Children,
  forwardRef,
  useContext,
  useState,
} from 'react';

import { ThemeContext } from 'styled-components';
import { backgroundAndTextColors, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';

import { StyledButton } from './StyledButton';

const Button = forwardRef(
  (
    {
      active,
      a11yTitle,
      color, // munged to avoid styled-components putting it in the DOM
      children,
      disabled,
      icon,
      focusIndicator = true,
      gap = 'small',
      fill, // munged to avoid styled-components putting it in the DOM
      hoverIndicator,
      href,
      justify,
      label,
      onBlur,
      onClick,
      onFocus,
      onMouseOut,
      onMouseOver,
      plain,
      primary,
      reverse,
      secondary,
      size,
      type = 'button',
      as,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [focus, setFocus] = useState();
    const [hover, setHover] = useState(false);
    const buttonTypes = {
      default: 'default',
      primary: 'primary',
      secondary: 'secondary',
    };

    if ((icon || label) && children) {
      console.warn(
        'Button should not have children if icon or label is provided',
      );
    }

    const onMouseOverButton = event => {
      setHover(true);
      if (onMouseOver) {
        onMouseOver(event);
      }
    };

    const onMouseOutButton = event => {
      setHover(false);
      if (onMouseOut) {
        onMouseOut(event);
      }
    };

    let buttonIcon = icon;
    let buttonType;
    // if default style defined in the theme, use these as default
    // button styling instead of underlying theme
    if (theme.button.default) buttonType = buttonTypes.default;
    if (secondary) buttonType = buttonTypes.secondary;
    if (primary) buttonType = buttonTypes.primary;

    // needed to keep icon color aligned with label color which is handled
    // in StyledButton.js
    // only change color if user did not specify the color themselves...
    if (icon && !icon.props.color) {
      if (buttonType) {
        const buttonThemePrefix = theme.button[buttonType]
          ? theme.button[buttonType]
          : theme.button;

        const iconColor = backgroundAndTextColors(
          buttonThemePrefix.background,
          theme.global.colors[buttonThemePrefix.color] ||
            buttonThemePrefix.color,
          theme,
        );

        buttonIcon = cloneElement(icon, {
          color: iconColor[1],
        });
      }
      if (primary) {
        const iconColor = backgroundAndTextColors(
          color ||
            theme.button.primary.background ||
            theme.button.primary.color ||
            'control',
          theme.button.primary.color,
          theme,
        );

        if (iconColor[1]) {
          buttonIcon = cloneElement(icon, {
            color: iconColor[1],
          });
        }
      }
      if (active) {
        const activeThemePrefix =
          theme.button.active && theme.button.active[buttonType]
            ? theme.button.active[buttonType]
            : theme.button.active;

        const iconColor = backgroundAndTextColors(
          activeThemePrefix.background,
          activeThemePrefix.color,
          theme,
        );

        buttonIcon = cloneElement(icon, {
          color: iconColor[1],
        });
      }
      if (hover && !disabled) {
        const hoverThemePrefix =
          theme.button.hover && theme.button.hover[buttonType]
            ? theme.button.hover[buttonType]
            : theme.button.hover;

        // TO-DO: check if hover indicator is true
        const iconColor = backgroundAndTextColors(
          hoverIndicator || hoverThemePrefix.background,
          !hoverIndicator && hoverThemePrefix.color,
          theme,
        );

        // only apply it if it exists, otherwise keep the previous style
        if (iconColor[1]) {
          buttonIcon = cloneElement(icon, {
            color: iconColor[1],
          });
        }
      }
      if (disabled) {
        const disabledThemePrefix =
          theme.button.disabled && theme.button.disabled[buttonType]
            ? theme.button.disabled[buttonType]
            : theme.button.disabled;

        if (disabledThemePrefix.color) {
          buttonIcon = cloneElement(icon, {
            color: disabledThemePrefix.color,
          });
        }
      }
      if (plain && !primary) {
        buttonIcon = cloneElement(icon, {
          color: normalizeColor(color, theme),
        });
      }
    }

    const domTag = !as && href ? 'a' : as;
    const first = reverse ? label : buttonIcon;
    const second = reverse ? buttonIcon : label;

    let contents;
    if (first && second) {
      contents = (
        <Box
          direction="row"
          align="center"
          justify={justify || 'center'}
          gap={gap}
        >
          {first}
          {second}
        </Box>
      );
    } else if (typeof children === 'function') {
      contents = children({ hover, focus });
    } else {
      contents = first || second || children;
    }
    return (
      <StyledButton
        {...rest}
        active={active}
        as={domTag}
        ref={ref}
        aria-label={a11yTitle}
        buttonType={buttonType}
        colorValue={color}
        disabled={disabled}
        hasIcon={!!icon}
        gap={gap}
        hasLabel={!!label}
        hoverIndicator={hoverIndicator}
        fillContainer={fill}
        focus={focus}
        focusIndicator={focusIndicator}
        href={href}
        secondary={secondary}
        onClick={onClick}
        onFocus={event => {
          setFocus(true);
          if (onFocus) onFocus(event);
        }}
        onBlur={event => {
          setFocus(false);
          if (onBlur) onBlur(event);
        }}
        onMouseOver={onMouseOverButton}
        onMouseOut={onMouseOutButton}
        pad={!plain}
        plain={
          typeof plain !== 'undefined'
            ? plain
            : Children.count(children) > 0 || (icon && !label)
        }
        primary={primary}
        sizeProp={size}
        type={!href ? type : undefined}
      >
        {contents}
      </StyledButton>
    );
  },
);

Button.displayName = 'Button';

let ButtonDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  ButtonDoc = require('./doc').doc(Button);
}
const ButtonWrapper = ButtonDoc || Button;

export { ButtonWrapper as Button };
