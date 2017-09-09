import React, { Component } from 'react';
import { compose } from 'recompose';

import { CoreNextLink } from 'grommet-icons';

import StyledAnchor, { StyledIcon } from './StyledAnchor';

import { withFocus, withTheme } from '../hocs';

import doc from './doc';

class Anchor extends Component {
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

    let anchorIcon;
    if (icon) {
      anchorIcon = icon;
    } else if (primary) {
      anchorIcon = (
        <CoreNextLink color={primary ? 'brand' : undefined} />
      );
    }

    if (anchorIcon) {
      anchorIcon = (
        <StyledIcon reverse={reverse} label={label} theme={theme}>{anchorIcon}</StyledIcon>
      );
    }

    const first = reverse ? label : anchorIcon;
    const second = reverse ? anchorIcon : label;

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
        href={!disabled ? href : undefined}
        onClick={!disabled ? onClick : undefined}
      >
        {first}
        {second}
        {children}
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
