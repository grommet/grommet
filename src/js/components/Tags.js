// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import Box from './Box';
import Props from '../utils/Props';

const CLASS_ROOT = "tags";

export default class Tags extends Component {

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
