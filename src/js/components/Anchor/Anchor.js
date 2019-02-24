import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { withFocus, withForwardRef } from '../hocs';

import { StyledAnchor } from './StyledAnchor';

class Anchor extends Component {
  constructor(props) {
    super(props);

    const { children, icon, label } = props;
    if ((icon || label) && children) {
      console.warn(
        'Anchor should not have children if icon or label is provided',
      );
    }
  }

  render() {
    const {
      a11yTitle,
      children,
      color,
      disabled,
      forwardRef,
      href,
      icon,
      focus,
      label,
      onClick,
      reverse,
      theme,
      ...rest
    } = this.props;

    let coloredIcon = icon;
    if (icon && !icon.props.color) {
      coloredIcon = cloneElement(icon, {
        color: normalizeColor(color || theme.anchor.color, theme),
      });
    }

    const first = reverse ? label : coloredIcon;
    const second = reverse ? coloredIcon : label;

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
        href={!disabled ? href : undefined}
        onClick={!disabled ? onClick : undefined}
      >
        {first && second ? (
          <Box
            as="span"
            direction="row"
            align="center"
            gap="small"
            style={{ display: 'inline-flex' }}
          >
            {first}
            {second}
          </Box>
        ) : (
          first || second || children
        )}
      </StyledAnchor>
    );
  }
}

Anchor.defaultProps = {};
Object.setPrototypeOf(Anchor.defaultProps, defaultProps);

let AnchorDoc;
if (process.env.NODE_ENV !== 'production') {
  AnchorDoc = require('./doc').doc(Anchor); // eslint-disable-line global-require
}
const AnchorWrapper = compose(
  withFocus(),
  withTheme,
  withForwardRef,
)(AnchorDoc || Anchor);

/* PropTypes for UXPin Merge */
Anchor.propTypes = {
  a11yTitle: PropTypes.string,
  alignSelf: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  gridArea: PropTypes.string,
  margin: PropTypes.oneOf(["none", "xxsmall", "xsmall", "small", "medium", "large", "xlarge"]),
  color: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.node,
  onClick: PropTypes.func,
  reverse: PropTypes.bool,
  size: PropTypes.oneOf(["xsmall", "small", "medium", "large", "xlarge", "xxlarge"]),
  as: PropTypes.string,
}

export { AnchorWrapper as Anchor };

/* Export for UXPin Merge */
export default Anchor;