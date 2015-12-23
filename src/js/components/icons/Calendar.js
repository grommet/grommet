// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

export default class Calendar extends Component {
  render() {
    var className = 'control-icon control-icon-calendar';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none" strokeWidth="2">
          <rect x="13" y="16" width="22" height="20"/>
          <path d="M17,16 L17,13"/>
          <path d="M31,16 L31,13"/>
          <path d="M13,23 L35,23"/>
        </g>
        <g stroke="none">
          <rect x="29" y="30" width="3" height="3"/>
        </g>
      </svg>
    );
  }
}
