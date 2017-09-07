import React, { Children, Component } from 'react';
import { compose } from 'recompose';

import StyledButton, { StyledLabel, StyledIcon } from './StyledButton';
import { Box } from '../box';

import { withFocus, withTheme } from '../hocs';

import doc from './doc';

const AnchorStyledButton = StyledButton.withComponent('a');
const BoxStyledButton = StyledButton.withComponent(Box);

class Button extends Component {
  static defaultProps = {
    type: 'button',
  };
  render() {
    const {
      a11yTitle,
      box,
      children,
      icon,
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

    let Tag = href ? AnchorStyledButton : StyledButton;

    let boxProps;
    if (box) {
      // Let the root element of the Button be a Box element with tag prop
      boxProps = {
        tag: href ? 'a' : 'button',
      };
      Tag = BoxStyledButton;
    }

    let buttonIcon;
    if (icon) {
      buttonIcon = <StyledIcon theme={theme}>{icon}</StyledIcon>;
    }

    let buttonLabel;
    if (label) {
      buttonLabel = <StyledLabel theme={theme}>{label}</StyledLabel>;
    }

    const first = reverse ? buttonLabel : buttonIcon;
    const second = reverse ? buttonIcon : buttonLabel;

    const disabled = (
      !href &&
      !onClick &&
      ['reset', 'submit'].indexOf(type) === -1
    );

    const plainProp = (
      plain ||
      box ||
      Children.count(children) > 0 ||
      (icon && !label)
    );

    return (
      <Tag
        tabIndex='0'
        {...rest}
        {...boxProps}
        aria-label={a11yTitle}
        box={box}
        disabled={disabled}
        icon={icon}
        focus={focus}
        href={href}
        label={label}
        onClick={onClick}
        plain={plainProp}
        theme={theme}
        type={!href ? type : undefined}
      >
        {first}
        {second}
        {children}
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
