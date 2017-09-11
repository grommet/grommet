import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { CoreNextLink } from 'grommet-icons';

import StyledAnchor, { StyledIcon } from './StyledAnchor';

import { withFocus, withTheme } from '../hocs';

import doc from './doc';

class Anchor extends Component {
  static contextTypes = {
    grommet: PropTypes.object.isRequired,
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
    } else if (primary) {
      anchorIcon = (
        <CoreNextLink color={primary ? 'brand' : undefined} />
      );
    }

    if (anchorIcon) {
      anchorIcon = (
        <StyledIcon key='styled-icon' reverse={reverse} label={label} theme={theme}>
          {anchorIcon}
        </StyledIcon>
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
        grommet={grommet}
        href={!disabled ? href : undefined}
        onClick={!disabled ? onClick : undefined}
      >
        {(first || second) ? [first, second] : children}
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
