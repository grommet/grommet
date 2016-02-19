// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

export default class Left extends Component {
  componentDidMount () {
    console.warn('This icon has been deprecated. Please check http://www.grommet.io/docs/develop/icon for the new set of icons.');
  }

  render () {
    var className = 'control-icon control-icon-left';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none" >
          <polyline strokeWidth="2" points="20.9,34 13,24 21,14 "/>
          <path strokeWidth="2"d="M13.3,24C36,24,36,24,36,24"/>
        </g>
      </svg>
    );
  }
}
