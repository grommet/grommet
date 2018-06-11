import React, { Component } from 'react';
import { compose } from 'recompose';

import Box from '../Box/Box';
import Text from '../Text/Text';

import { withFocus, withForwardRef, withTheme } from '../hocs';

import StyledAnchor from './StyledAnchor';
import doc from './doc';

class Anchor extends Component {
  constructor(props) {
    super(props);

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
      forwardRef,
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

    const anchorLabel = typeof label === 'string' ? (
      <Text>
        <strong>{label}</strong>
      </Text>
    ) : label;

    const first = reverse ? anchorLabel : icon;
    const second = reverse ? icon : anchorLabel;

    return (
      <StyledAnchor
        {...rest}
        innerRef={forwardRef}
        aria-label={a11yTitle}
        disabled={disabled}
        icon={icon}
        focus={focus}
        label={label}
        primary={primary}
        reverse={reverse}
        theme={theme}
        href={!disabled ? href : undefined}
        onClick={!disabled ? onClick : undefined}
      >
        {(first || second) ? (
          <Box direction='row' align='center' gap='small'>
            {[first, second]}
          </Box>
        ) : children}
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
  withForwardRef,
)(Anchor);
