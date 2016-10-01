// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import classnames from 'classnames';
import Box from './Box';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.SECTION;

export default class Section extends Component {
  render () {
    const { className, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      className
    );

    return (
      <Box {...props} tag="section" className={classes} />
    );
  }
};

Section.propTypes = {
  ...Box.propTypes
};

Section.defaultProps = {
  pad: {vertical: 'medium'}
};
