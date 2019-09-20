import React, { cloneElement, Children, Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { colorIsDark, normalizeBackground, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { withFocus, withForwardRef } from '../hocs';

import { StyledButton } from './StyledButton';

const isDarkBackground = props => {
  const backgroundColor = normalizeBackground(
    normalizeColor(
      props.color ||
        props.theme.button.primary.color ||
        props.theme.global.colors.control ||
        'brand',
      props.theme,
    ),
    props.theme,
  );

  return colorIsDark(backgroundColor, props.theme);
};

class Button extends Component {
  static defaultProps = {
    type: 'button',
    focusIndicator: true,
    gap: 'small',
  };

  constructor(props) {
    super(props);

    const { children, icon, label } = props;
    if ((icon || label) && children) {
      console.warn(
        'Button should not have children if icon or label is provided',
      );
    }
  }

  state = {};

  onMouseOver = event => {
    const { onMouseOver } = this.props;
    this.setState({ hover: true });
    if (onMouseOver) {
      onMouseOver(event);
    }
  };

  onMouseOut = event => {
    const { onMouseOut } = this.props;
    this.setState({ hover: false });
    if (onMouseOut) {
      onMouseOut(event);
    }
  };

  render() {
    const {
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
      plain,
      primary,
      reverse,
      theme,
      type,
      as,
      ...rest
    } = this.props;
    const { hover } = this.state;

    let buttonIcon = icon;
    // only change color if user did not specify the color themselves...
    if (primary && icon && !icon.props.color) {
      buttonIcon = cloneElement(icon, {
        color:
          theme.global.colors.text[
            isDarkBackground(this.props) ? 'dark' : 'light'
          ],
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
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
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
  }
}

Object.setPrototypeOf(Button.defaultProps, defaultProps);

let ButtonDoc;
if (process.env.NODE_ENV !== 'production') {
  ButtonDoc = require('./doc').doc(Button); // eslint-disable-line global-require
}
const ButtonWrapper = compose(
  withFocus(),
  withTheme,
  withForwardRef,
)(ButtonDoc || Button);

export { ButtonWrapper as Button };
