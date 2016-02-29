// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Props from '../utils/Props';

const CLASS_ROOT = 'section';

export default class Section extends Component {
  render () {
    var classes = classnames(CLASS_ROOT, this.props.className);

    let boxProps = Props.pick(this.props, Box);

    return (
      <Box {...boxProps} tag="section" className={classes}
        primary={this.props.primary}>
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
