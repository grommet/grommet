// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

export default class Add extends Component {
  componentDidMount () {
    console.warn('This icon has been deprecated. Please check http://www.grommet.io/docs/develop/icon for the new set of icons.');
  }

  render () {
    var className = 'control-icon control-icon-add';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1"
        onClick={this.props.onClick}>
        <g fill="none">
          <line strokeWidth="2" x1="24" y1="14" x2="24" y2="34"/>
          <line strokeWidth="2" x1="14" y1="24" x2="34" y2="24"/>
        </g>
      </svg>
    );
  }
}

Add.propTypes = {
  onClick: PropTypes.func
};
