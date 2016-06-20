// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';

const CLASS_ROOT = 'section';

export default class Section extends Component {
  render () {
    var classes = classnames(CLASS_ROOT, this.props.className);

    let boxProps = { ...this.props };
    delete boxProps.className;
    delete boxProps.children;

    return (
      <Box {...boxProps} tag="section" className={classes}>
        {this.props.children}
      </Box>
    );
  }
};

Section.propTypes = {
  primary: PropTypes.bool,
  ...Box.propTypes
};

Section.defaultProps = {
  pad: {vertical: 'medium'}
};
