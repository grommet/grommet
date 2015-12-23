// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

export default class More extends Component {
  render() {
    var className = 'control-icon control-icon-more';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none">
          <rect x="23" y="23" strokeWidth="2" width="2" height="2"/>
          <rect x="15" y="23" strokeWidth="2" width="2" height="2"/>
          <rect x="31" y="23" strokeWidth="2" width="2" height="2"/>
        </g>
      </svg>
    );
  }
}
