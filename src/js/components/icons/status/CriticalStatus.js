// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import FormattedMessage from '../../FormattedMessage';
import CSSClassnames from '../../../utils/CSSClassnames';

const STATUS_ICON = CSSClassnames.STATUS_ICON;

export default class CriticalStatus extends Component {
  render() {
    var className = `${STATUS_ICON} ${STATUS_ICON}-critical`;
    var a11yTitle = this.props.a11yTitle;
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    if (typeof a11yTitle === "undefined") {
      // this.props.a11yTitle emplty string is an acceptable value.
      // only if undefined should use the default title value.
      a11yTitle ='Critical';
    }
    var criticalTitleId = 'critical-title';
    return (
      <svg className={className} viewBox="0 0 24 24"
        aria-labelledby={criticalTitleId} role="img" version="1.1">
        <title id={criticalTitleId}>
          <FormattedMessage id={a11yTitle} defaultMessage={a11yTitle} />
        </title>
        <g className={`${STATUS_ICON}__base`} stroke="none">
          <path role="presentation" d="M12,0 L24,12 L12,24 L0,12 Z"></path>
        </g>
        <g className={`${STATUS_ICON}__detail`} fill="none">
          <path role="presentation" d="M8,8 L16,16" strokeWidth="2"></path>
          <path role="presentation" d="M8,16 L16,8" strokeWidth="2"></path>
        </g>
      </svg>
    );
  }
}

CriticalStatus.propTypes = {
  a11yTitle: PropTypes.string
};
