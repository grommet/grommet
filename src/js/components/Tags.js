// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import Box from './Box';
import Props from '../utils/Props';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TAGS;

export default class Tags extends Component {

  constructor () {
    super();
    console.warn(
      'Tags: component has been deprecated. Use Box instead.'
    );
  }

  render () {
    var classes = [CLASS_ROOT];

    if (this.props.className) {
      classes.push(this.props.className);
    }

    var other = Props.pick(this.props, Object.keys(Box.propTypes));

    return (
      <Box {...other}
        className={classes.join(' ')}
        direction={this.props.direction}
        align={this.props.align}
        wrap={true}>
        {this.props.children}
      </Box>
    );
  }
}

Tags.propTypes = {
  ...Box.propTypes
};

Tags.defaultProps = {
  direction: 'row',
  align: 'start'
};
