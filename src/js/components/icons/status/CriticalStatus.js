// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import FormattedMessage from '../../FormattedMessage';
import CSSClassnames from '../../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.STATUS_ICON;

export default class CriticalStatus extends Component {
  render() {
    const { a11yTitle, className, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-critical`,
      className
    );
    const criticalTitleId = 'critical-title';
    return (
      <svg {...props} className={classes} viewBox="0 0 24 24"
        aria-labelledby={criticalTitleId} role="img" version="1.1">
        <title id={criticalTitleId}>
          <FormattedMessage id={a11yTitle} defaultMessage={a11yTitle} />
        </title>
        <g className={`${CLASS_ROOT}__base`} stroke="none">
          <path role="presentation" d="M12,0 L24,12 L12,24 L0,12 Z" />
        </g>
        <g className={`${CLASS_ROOT}__detail`} fill="none">
          <path role="presentation" d="M8,8 L16,16" strokeWidth="2" />
          <path role="presentation" d="M8,16 L16,8" strokeWidth="2" />
        </g>
      </svg>
    );
  }
}

CriticalStatus.defaultProps = {
  a11yTitle: 'Critical'
};

CriticalStatus.propTypes = {
  a11yTitle: PropTypes.string
};
