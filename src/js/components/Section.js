// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import classnames from 'classnames';
import Box from './Box';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.SECTION;

export default class Section extends Component {
  render () {
    var classes = classnames(CLASS_ROOT, this.props.className);

    let boxProps = { ...this.props };
    delete boxProps.className;

    return (
      <Box {...boxProps} tag="section" className={classes} />
    );
  }
};

Section.propTypes = {
  ...Box.propTypes
};

Section.defaultProps = {
  pad: {vertical: 'medium'}
};
