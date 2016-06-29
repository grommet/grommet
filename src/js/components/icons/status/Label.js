// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import CSSClassnames from '../../../utils/CSSClassnames';

const STATUS_ICON = CSSClassnames.STATUS_ICON;

export default class Label extends Component {
  render() {
    var className = `${STATUS_ICON} ${STATUS_ICON}-label`;
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1">
        <g className={`${STATUS_ICON}__base`}>
          <circle cx="12" cy="12" r="12" stroke="none"></circle>
        </g>
      </svg>
    );
  }
}
