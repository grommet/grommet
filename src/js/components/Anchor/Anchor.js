import React, { cloneElement, Component } from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { Text } from '../Text';
import { withFocus, withForwardRef, withTheme } from '../hocs';

import { StyledAnchor } from './StyledAnchor';
import { normalizeColor } from '../../utils';

class Anchor extends Component {
  constructor(props) {
    super(props);

    const { children, icon, label } = props;
    if ((icon || label) && children) {
      console.warn('Anchor should not have children if icon or label is provided');
    }
  }

  render() {
    const { a11yTitle, children, color, disabled, forwardRef, href, icon, focus, label, onClick, reverse, theme, ...rest } = this.props;

    const anchorLabel = typeof label === 'string' ? <Text>{label}</Text> : label;

    let coloredIcon = icon;
    if (icon && !icon.props.color) {
      coloredIcon = cloneElement(icon, {
        color: normalizeColor(color || theme.anchor.color, theme),
      });
    }

    const first = reverse ? anchorLabel : coloredIcon;
    const second = reverse ? coloredIcon : anchorLabel;

    return (
      <StyledAnchor
        {...rest}
        ref={forwardRef}
        aria-label={a11yTitle}
        colorProp={color}
        disabled={disabled}
        hasIcon={!!icon}
        focus={focus}
        hasLabel={label}
        reverse={reverse}
        theme={theme}
        href={!disabled ? href : undefined}
        onClick={!disabled ? onClick : undefined}
      >
        {first || second ? (
          <Box tag="span" direction="row" align="center" gap="small" style={{ display: 'inline-flex' }}>
            {first}
            {second}
          </Box>
        ) : (
          children
        )}
      </StyledAnchor>
    );
  }
}

let AnchorDoc;
if (process.env.NODE_ENV !== 'production') {
  AnchorDoc = require('./doc').doc(Anchor); // eslint-disable-line global-require
}
const AnchorWrapper = compose(
  withFocus,
  withTheme,
  withForwardRef
)(AnchorDoc || Anchor);

export { AnchorWrapper as Anchor };
