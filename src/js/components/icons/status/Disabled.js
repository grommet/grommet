// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import FormattedMessage from '../../FormattedMessage';
import CSSClassnames from '../../../utils/CSSClassnames';

const STATUS_ICON = CSSClassnames.STATUS_ICON;

export default class Disabled extends Component {
  render() {
    var className = `${STATUS_ICON} ${STATUS_ICON}-disabled`;
    var a11yTitle = this.props.a11yTitle;
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    if (typeof this.props.a11yTitle === "undefined") {
      // this.props.a11yTitle emplty string is an acceptable value. Only if undefined
      // should use the default title value.
      a11yTitle = 'Disabled';
    }
    var disabledTitleId = 'disabled-title';
    return (
      <svg className={className} viewBox="0 0 24 24" role="img" aria-labelledby={disabledTitleId} version="1.1">
        <title id={disabledTitleId}>
          <FormattedMessage id={a11yTitle} defaultMessage={a11yTitle} />
        </title>
        <g className={`${STATUS_ICON}__base`}>
          <path role="presentation" stroke="none" d="M21,24 L3,24 C1.3,24 0,22.7 0,21 L0,3 C0,1.3 1.3,0 3,0 L21,0 C22.7,0 24,1.3 24,3 L24,21 C24,22.7 22.7,24 21,24 L21,24 Z"></path>
        </g>
        <g className={`${STATUS_ICON}__detail`} strokeWidth="2">
          <path d="M6,12 L18,12"></path>
        </g>
      </svg>
    );
  }
}

Disabled.propTypes = {
  a11yTitle: PropTypes.string
};
