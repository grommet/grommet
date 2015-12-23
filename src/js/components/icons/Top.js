// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

export default class Top extends Component {
  render() {
    var className = 'control-icon control-icon-top';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none">
          <polyline strokeWidth="2" points="14,20.9 24,13 34,21 "/>
          <path strokeWidth="2" d="M24,13.3C24,36,24,36,24,36"/>
          <line strokeWidth="2" x1="13" y1="11" x2="35" y2="11"/>
        </g>
      </svg>
    );
  }
}
