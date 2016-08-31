// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import FormattedMessage from '../../FormattedMessage';
import CSSClassnames from '../../../utils/CSSClassnames';

const STATUS_ICON = CSSClassnames.STATUS_ICON;

export default class Blank extends Component {
  render() {
    var className = `${STATUS_ICON} ${STATUS_ICON}-blank`;
    var a11yTitle = this.props.a11yTitle;
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    if (typeof this.props.a11yTitle === "undefined") {
      // this.props.a11yTitle empty string is an acceptable value.
      // Only if undefined
      // should use the default title value.
      a11yTitle = 'Blank';
    }
    var blankTitleId = 'blank-title';
    return (
      <svg className={className} viewBox="0 0 24 24" role="img"
        aria-labelledby={blankTitleId} version="1.1">
        <title id={blankTitleId}>
          <FormattedMessage id={a11yTitle} defaultMessage={a11yTitle} />
        </title>
      </svg>
    );
  }
}
