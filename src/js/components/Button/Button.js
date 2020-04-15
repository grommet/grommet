import React, {
  cloneElement,
  Children,
  forwardRef,
  useContext,
  useState,
} from 'react';

import { ThemeContext } from 'styled-components';
import {
  backgroundIsDark,
  colorIsDark,
  getHoverIndicatorStyle,
  normalizeBackground,
  normalizeColor,
} from '../../utils';
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
      simple,
      onBlur,
      onClick,
      onFocus,
      onMouseOut,
      onMouseOver,
      plain,
      primary,
      reverse,
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
      primary: 'primary',
      simple: 'simple',
    };

    if ((icon || label) && children) {
      console.warn(
        'Button should not have children if icon or label is provided',
      );
    }

    const isDarkBackground = buttonType => {
      if (hover && hoverIndicator) {
        return backgroundIsDark(
          getHoverIndicatorStyle(hoverIndicator, theme),
          theme,
        );
      }

      const backgroundValue =
        color ||
        (hover && !disabled && theme.button[buttonType].hover.color) ||
        theme.button[buttonType].color ||
        (buttonType === buttonTypes.primary &&
          (theme.global.colors.control || 'brand'));

      let backgroundColor;
      if (backgroundValue) {
        backgroundColor = normalizeBackground(
          normalizeColor(backgroundValue, theme),
          theme,
        );
      }

      return backgroundColor ? colorIsDark(backgroundColor, theme) : theme.dark;
    };

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
    // primary color styling should overrule simple
    if (simple) buttonType = buttonTypes.simple;
    if (primary) buttonType = buttonTypes.primary;

    // only change color if user did not specify the color themselves...
    if (buttonType && icon && !icon.props.color) {
      buttonIcon = cloneElement(icon, {
        color:
          theme.global.colors.text[
            isDarkBackground(buttonType) ? 'dark' : 'light'
          ],
      });
    }
    if (active && icon && !icon.props.color) {
      buttonIcon = cloneElement(icon, {
        color: theme.global.active.color,
      });
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
        simple={simple}
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
            : Children.count(children) > 0 || (icon && !label && !simple)
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
