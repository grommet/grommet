// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

export default class Person extends Component {
  componentDidMount () {
    console.warn('This icon has been deprecated. Please check http://www.grommet.io/docs/develop/icon for the new set of icons.');
  }

  render () {
    var className = 'control-icon control-icon-person';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1"
        onClick={this.props.onClick}>
        <g fill="none" strokeWidth="2">
          <circle cx="24" cy="18" r="5"></circle>
          <path d="M33,36 L33,31 C33,26.6 29.4,23 25,23 L23,23 C18.6,23 15,26.6 15,31 L15,36"></path>
          <path d="M20,36 L20,31"></path>
          <path d="M28,36 L28,31"></path>
        </g>
      </svg>
    );
  }
}

Person.propTypes = {
  onClick: PropTypes.func
};
