// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

const CLASS_ROOT = "bricks";

export default class Bricks extends Component {
  render () {
    var classes = [CLASS_ROOT];

    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div ref="bricks" className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }
}
