import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { withFocus, withTheme } from '../hocs';

import StyledAnchor, { StyledIcon } from './StyledAnchor';
import doc from './doc';

class Anchor extends Component {
  static contextTypes = {
    grommet: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);

    const { children, icon, label } = props;
    if ((icon || label) && children) {
      console.warn('Anchor should not have children if icon or label is provided');
    }
  }

  render() {
    const {
      a11yTitle,
      children,
      disabled,
      href,
      icon,
      focus,
      label,
      primary,
      onClick,
      reverse,
      theme,
      ...rest
    } = this.props;
    const { grommet } = this.context;

    let anchorIcon;
    if (icon) {
      anchorIcon = icon;
    }

    if (anchorIcon) {
      anchorIcon = (
        <StyledIcon reverse={reverse} label={label} theme={theme}>
          {anchorIcon}
        </StyledIcon>
      );
    }

    let first;
    let second;
    if (children) {
      first = children;
    } else if (reverse) {
      first = label || null;
      second = anchorIcon || null;
    } else {
      first = anchorIcon || null;
      second = label || null;
    }

    return (
      <StyledAnchor
        {...rest}
        aria-label={a11yTitle}
        disabled={disabled}
        icon={anchorIcon}
        focus={focus}
        label={label}
        primary={primary}
        reverse={reverse}
        theme={theme}
        grommet={grommet}
        href={!disabled ? href : undefined}
        onClick={!disabled ? onClick : undefined}
      >
        {first}
        {second}
      </StyledAnchor>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Anchor);
}

export default compose(
  withFocus,
  withTheme,
)(Anchor);
