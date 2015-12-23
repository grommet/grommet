// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

export default class Down extends Component {
  render() {
    var className = 'control-icon control-icon-down';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none">
          <polyline strokeWidth="2" points="34,27.1 24,35 14,27 "/>
          <path strokeWidth="2" d="M24,34.7C24,12,24,12,24,12"/>
        </g>
      </svg>
    );
  }
}
