import React, { cloneElement, Children, useState } from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { colorIsDark, normalizeBackground, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { withFocus, withForwardRef } from '../hocs';

import { StyledButton } from './StyledButton';

const Button = ({
  a11yTitle,
  color, // munged to avoid styled-components putting it in the DOM
  forwardRef,
  children,
  disabled,
  icon,
  gap,
  fill, // munged to avoid styled-components putting it in the DOM
  focus,
  href,
  label,
  onClick,
  onMouseOut,
  onMouseOver,
  plain,
  primary,
  reverse,
  theme,
  type,
  as,
  ...rest
}) => {
  if ((icon || label) && children) {
    console.warn(
      'Button should not have children if icon or label is provided',
    );
  }

  const isDarkBackground = () => {
    const backgroundColor = normalizeBackground(
      normalizeColor(
        color ||
          theme.button.primary.color ||
          theme.global.colors.control ||
          'brand',
        theme,
      ),
      theme,
    );

    return colorIsDark(backgroundColor, theme);
  };

  const [hover, setHover] = useState(false);

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
  if (icon && !icon.props.color) {
    let buttonIconColor;
    let buttonColor;
    let isDark;
    if (primary) {
      if (theme.button.color) {
        isDark = isDarkBackground();
        buttonColor = isDark
          ? theme.button.color.dark
          : theme.button.color.light;
        buttonIconColor = normalizeColor(buttonColor, theme);
      } else {
        buttonIconColor = theme.global.colors.text[isDark ? 'dark' : 'light'];
      }
    } else {
      buttonIconColor = normalizeColor(theme.button.color, theme);
    }
    buttonIcon = cloneElement(icon, {
      color: buttonIconColor,
    });
  }

  const domTag = !as && href ? 'a' : as;
  const first = reverse ? label : buttonIcon;
  const second = reverse ? buttonIcon : label;

  let contents;
  if (first && second) {
    contents = (
      <Box direction="row" align="center" justify="center" gap={gap}>
        {first}
        {second}
      </Box>
    );
  } else if (typeof children === 'function') {
    contents = children({ hover, focus });
  } else {
    contents = first || second || children;
  }
  // the key events are covered by withFocus()
  /* eslint-disable jsx-a11y/mouse-events-have-key-events */
  return (
    <StyledButton
      {...rest}
      as={domTag}
      ref={forwardRef}
      aria-label={a11yTitle}
      colorValue={color}
      disabled={disabled}
      hasIcon={!!icon}
      gap={gap}
      hasLabel={!!label}
      fillContainer={fill}
      focus={focus}
      href={href}
      onClick={onClick}
      onMouseOver={onMouseOverButton}
      onMouseOut={onMouseOutButton}
      pad={!plain}
      plain={
        typeof plain !== 'undefined'
          ? plain
          : Children.count(children) > 0 || (icon && !label)
      }
      primary={primary}
      type={!href ? type : undefined}
    >
      {contents}
    </StyledButton>
  );
};

Button.defaultProps = {
  type: 'button',
  focusIndicator: true,
  gap: 'small',
};

Object.setPrototypeOf(Button.defaultProps, defaultProps);

let ButtonDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  ButtonDoc = require('./doc').doc(Button);
}
const ButtonWrapper = compose(
  withFocus(),
  withTheme,
  withForwardRef,
)(ButtonDoc || Button);

export { ButtonWrapper as Button };
