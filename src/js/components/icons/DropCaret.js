// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

export default class DropCaret extends Component {
  componentDidMount () {
    console.warn('This icon has been deprecated. Please check http://www.grommet.io/docs/develop/icon for the new set of icons.');
  }

  render () {
    var className = 'control-icon control-icon-drop-caret';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1" >
        <g fill="none">
          <polyline strokeWidth="2" strokeMiterlimit="10" points="34,19 24,29 14,19 "/>
        </g>
      </svg>
    );
  }
}
