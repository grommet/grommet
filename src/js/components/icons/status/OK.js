// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import FormattedMessage from '../../FormattedMessage';
import CSSClassnames from '../../../utils/CSSClassnames';

const STATUS_ICON = CSSClassnames.STATUS_ICON;

export default class OK extends Component {
  render() {
    var className = `${STATUS_ICON} ${STATUS_ICON}-ok`;
    var a11yTitle = this.props.a11yTitle;
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    if (typeof this.props.a11yTitle === "undefined") {
      // this.props.a11yTitle emplty string is an acceptable value only if undefined
      // should it use the default title value
      a11yTitle = 'OK';
    }
    var okTitleId = 'ok-title';
    return (
      <svg className={className} viewBox="0 0 24 24" role="img" aria-labelledby={okTitleId} version="1.1">
        <title id={okTitleId}>
          <FormattedMessage id={a11yTitle} defaultMessage={a11yTitle} />
        </title>
        <g className={`${STATUS_ICON}__base`}>
          <circle role="presentation" cx="12" cy="12" r="12" stroke="none" />
        </g>
        <g className={`${STATUS_ICON}__detail`}>
          <path role="presentation" d="M10,17.4 L5.3,12.7 L6.7,11.3 L10,14.6 L17.3,7.3 L18.7,8.7 L10,17.4 Z" stroke="none"></path>
        </g>
      </svg>
    );
  }
}

OK.propTypes = {
  a11yTitle: PropTypes.string
};
