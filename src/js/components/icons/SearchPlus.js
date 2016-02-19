// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

export default class SearchPlus extends Component {
  componentDidMount () {
    console.warn('This icon has been deprecated. Please check http://www.grommet.io/docs/develop/icon for the new set of icons.');
  }

  render () {
    var className = 'control-icon control-icon-search-plus';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g strokeWidth="4" fill="none" fillRule="evenodd">
          <circle strokeWidth="4" cx="21" cy="21" r="7"></circle>
          <path d="M27.2,27 L34.2,36" strokeWidth="4" strokeLinecap="round"></path>
          <path d="M34,13 L34,19" strokeWidth="2" strokeLinecap="round"></path>
          <path d="M37,16 L31,16" strokeWidth="2" strokeLinecap="round"></path>
        </g>
      </svg>
    );
  }
}
