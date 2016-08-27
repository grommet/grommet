// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Props from '../utils/Props';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.SIDEBAR;

export default class Sidebar extends Component {
  render () {
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--fixed`]: this.props.fixed,
        [`${CLASS_ROOT}--full`]: this.props.full,
        [`${CLASS_ROOT}--${this.props.size}`]: this.props.size
      }
    );

    const boxProps = Props.pick(this.props, Object.keys(Box.propTypes));
    const restProps = Props.omit(this.props, Object.keys(Sidebar.propTypes));

    return (
      <Box {...restProps} {...boxProps} className={classes}>
        {this.props.children}
      </Box>
    );
  }
};

Sidebar.propTypes = {
  fixed: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  full: PropTypes.bool,
  ...Box.propTypes
};

Sidebar.defaultProps = {
  direction: 'column',
  full: true
};
