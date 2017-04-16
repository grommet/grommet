// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import Box from './Box';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.SIDEBAR;

export default class Sidebar extends Component {
  render () {
    const { children, className, fixed, full, size, ...props } = this.props;
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--fixed`]: fixed,
        [`${CLASS_ROOT}--full`]: full,
        [`${CLASS_ROOT}--${size}`]: size
      },
      className
    );

    return (
      <Box {...props} className={classes}>
        {children}
      </Box>
    );
  }
}

Sidebar.propTypes = {
  fixed: PropTypes.bool,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
  full: PropTypes.bool,
  ...Box.propTypes
};

Sidebar.defaultProps = {
  direction: 'column',
  full: true
};
