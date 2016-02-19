// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

export default class Search extends Component {
  componentDidMount () {
    console.warn('This icon has been deprecated. Please check http://www.grommet.io/docs/develop/icon for the new set of icons.');
  }

  render () {
    var className = 'control-icon control-icon-search';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none">
          <circle strokeWidth="2" cx="21.5" cy="21.5" r="9"/>
          <line strokeWidth="2" x1="35.5" y1="35.5" x2="27.8" y2="27.8"/>
        </g>
      </svg>
    );
  }
}
