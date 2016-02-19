// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import FormattedMessage from '../../FormattedMessage';

export default class ErrorStatus extends Component {
  render() {
    var className = 'status-icon status-icon-error';
    var a11yTitle = this.props.a11yTitle;
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    if (typeof a11yTitle === "undefined") {
      // this.props.a11yTitle emplty string is an acceptable value. Only if undefined
      // should use the default title value.
      a11yTitle ='Error';
    }
    var errorTitleId = 'error-title';
    return (
      <svg className={className} viewBox="0 0 24 24" aria-labelledby={errorTitleId} role="img" version="1.1">
        <title id={errorTitleId}>
          <FormattedMessage id={a11yTitle} defaultMessage={a11yTitle} />
        </title>
        <g className={"status-icon__base"} stroke="none">
          <path role="presentation" d="M12,0 L24,12 L12,24 L0,12 Z"></path>
        </g>
        <g className={"status-icon__detail"} fill="none">
          <path role="presentation" d="M8,8 L16,16" strokeWidth="2"></path>
          <path role="presentation" d="M8,16 L16,8" strokeWidth="2"></path>
        </g>
      </svg>
    );
  }
}

ErrorStatus.propTypes = {
  a11yTitle: PropTypes.string
};
