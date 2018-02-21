import React, { Children, Component } from 'react';
import { compose } from 'recompose';

import { withFocus, withTheme } from '../hocs';

import StyledButton, { StyledLabel, StyledIcon } from './StyledButton';
import doc from './doc';

const AnchorStyledButton = StyledButton.withComponent('a');

class Button extends Component {
  static defaultProps = {
    type: 'button',
    focusIndicator: true,
  };

  constructor(props, context) {
    super(props, context);

    const { children, icon, label } = props;
    if ((icon || label) && children) {
      console.warn('Button should not have children if icon or label is provided');
    }
  }

  render() {
    const {
      a11yTitle,
      children,
      icon,
      focus,
      href,
      label,
      onClick,
      reverse,
      theme,
      type,
      ...rest
    } = this.props;

    const Tag = href ? AnchorStyledButton : StyledButton;

    let buttonIcon;
    if (icon) {
      buttonIcon = (
        <StyledIcon aria-hidden={true} key='styled-icon' theme={theme}>{icon}</StyledIcon>
      );
    }

    let buttonLabel;
    if (label) {
      buttonLabel = <StyledLabel key='styled-label' theme={theme}>{label}</StyledLabel>;
    }

    const first = reverse ? buttonLabel : buttonIcon;
    const second = reverse ? buttonIcon : buttonLabel;

    const disabled = (
      !href &&
      !onClick &&
      ['reset', 'submit'].indexOf(type) === -1
    );

    // tabIndex is needed because you may use button inside an svg
    // without tabIndex it does not work in that scenario
    return (
      <Tag
        {...rest}
        aria-label={a11yTitle}
        disabled={disabled}
        icon={icon}
        focus={focus}
        href={href}
        label={label}
        onClick={onClick}
        plain={Children.count(children) > 0 || (icon && !label)}
        theme={theme}
        type={!href ? type : undefined}
      >
        {(first || second) ? [first, second] : children}
      </Tag>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Button);
}

export default compose(
  withFocus,
  withTheme,
)(Button);
