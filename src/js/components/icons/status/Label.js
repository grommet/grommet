// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

export default class Label extends Component {
  render() {
    var className = 'status-icon status-icon-label';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1">
        <g className={"status-icon__base"}>
          <circle cx="12" cy="12" r="12" stroke="none"></circle>
        </g>
      </svg>
    );
  }
}
