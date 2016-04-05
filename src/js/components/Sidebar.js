// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Props from '../utils/Props';

const CLASS_ROOT = 'sidebar';

export default class Sidebar extends Component {
  render () {
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--primary`]: this.props.primary,
        [`${CLASS_ROOT}--fixed`]: this.props.fixed,
        [`${CLASS_ROOT}--full`]: this.props.full,
        [`${CLASS_ROOT}--${this.props.size}`]: this.props.size
      }
    );

    let boxProps = Props.pick(this.props, Object.keys(Box.propTypes));

    return (
      <Box {...boxProps} className={classes} primary={false}>
        {this.props.children}
      </Box>
    );
  }
};

Sidebar.propTypes = {
  fixed: PropTypes.bool,
  primary: PropTypes.bool, // Deprecated
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  full: PropTypes.bool,
  ...Box.propTypes
};

Sidebar.defaultProps = {
  direction: 'column',
  primary: false,
  full: true
};
