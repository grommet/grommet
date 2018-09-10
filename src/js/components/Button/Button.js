import React, { Children, Component } from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { Text } from '../Text';
import { withFocus, withForwardRef, withTheme } from '../hocs';

import { StyledButton } from './StyledButton';

const AnchorStyledButton = StyledButton.withComponent('a');

class Button extends Component {
  static defaultProps = {
    type: 'button',
    focusIndicator: true,
  };

  constructor(props) {
    super(props);

    const { children, icon, label } = props;
    if ((icon || label) && children) {
      console.warn('Button should not have children if icon or label is provided');
    }
  }

  render() {
    const {
      a11yTitle,
      color, // munged to avoid styled-components putting it in the DOM
      forwardRef,
      children,
      icon,
      fill, // munged to avoid styled-components putting it in the DOM
      focus,
      href,
      label,
      onClick,
      plain,
      reverse,
      theme,
      type,
      ...rest
    } = this.props;

    const Tag = href ? AnchorStyledButton : StyledButton;

    const buttonLabel = typeof label === 'string' ? (
      <Text>
        <strong>{label}</strong>
      </Text>
    ) : label;

    const first = reverse ? buttonLabel : icon;
    const second = reverse ? icon : buttonLabel;

    const disabled = (
      !href &&
      !onClick &&
      ['reset', 'submit'].indexOf(type) === -1
    );

    return (
      <Tag
        {...rest}
        ref={forwardRef}
        aria-label={a11yTitle}
        colorValue={color}
        disabled={disabled}
        hasIcon={!!icon}
        hasLabel={!!label}
        fillContainer={fill}
        focus={focus}
        href={href}
        onClick={onClick}
        plain={typeof plain !== 'undefined' ? (
          plain
        ) : (
          (Children.count(children) > 0 || (icon && !label))
        )}
        theme={theme}
        type={!href ? type : undefined}
      >
        {(first || second) ? (
          <Box
            direction='row'
            align='center'
            justify='center'
            gap='small'
            pad={icon && !plain ? 'small' : undefined}
          >
            {first}
            {second}
          </Box>
        ) : children}
      </Tag>
    );
  }
}

let ButtonDoc;
if (process.env.NODE_ENV !== 'production') {
  ButtonDoc = require('./doc').doc(Button); // eslint-disable-line global-require
}
const ButtonWrapper = compose(
  withFocus,
  withTheme,
  withForwardRef,
)(ButtonDoc || Button);

export { ButtonWrapper as Button };
