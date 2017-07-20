import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import deepAssign from 'deep-assign';

import StyledButton, { StyledLabel, StyledIcon } from './StyledButton';

import { withFocus } from '../hocs';

import doc from './doc';

class Button extends Component {
  static contextTypes = {
    theme: PropTypes.object.isRequired,
  }
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
    const { theme: contextTheme } = this.context;
    const localTheme = deepAssign(contextTheme, theme);

    let Tag = StyledButton;
    if (href) {
      Tag = Tag.withComponent('a');
    }

    let boxProps;
    if (box) {
      // Let the root element of the Button be a Box element with tag prop
      boxProps = {
        tag: href ? 'a' : 'button',
      };
      // TODO: replace it with Box
      Tag = Tag.withComponent('div');
    }

    let buttonIcon;
    if (icon) {
      buttonIcon = <StyledIcon theme={localTheme}>{icon}</StyledIcon>;
    }

    let buttonLabel;
    if (label) {
      buttonLabel = <StyledLabel theme={localTheme}>{label}</StyledLabel>;
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
        {...rest}
        {...boxProps}
        aria-label={a11yTitle}
        box={box}
        disabled={disabled}
        focus={focus}
        href={href}
        onClick={onClick}
        plain={plainProp}
        theme={localTheme}
        type={type}
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

export default withFocus(Button);
