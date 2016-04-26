// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

var CLASS_ROOT = "icon-spinning";

export default class Spinning extends Component {
  render () {
    var classes = [CLASS_ROOT];
    if (this.props.small) {
      classes.push(CLASS_ROOT + "--small");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <svg className={classes.join(' ')} viewBox="0 0 48 48" version="1.1"
        role='img'>
        <title>Spinning</title>
        <circle stroke="#ddd" strokeWidth="4" strokeDasharray="24px 8px" fill="none" cx="24" cy="24" r="20"></circle>
        <circle stroke="#333" strokeWidth="4" strokeDasharray="24px 104px" fill="none" cx="24" cy="24" r="20"></circle>
      </svg>
    );
  }
}
