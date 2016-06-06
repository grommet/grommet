// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { FormattedDate } from 'react-intl';
import Box from './Box';
import Meter from './Meter';
import StatusIcon from './icons/Status';
import Props from '../utils/Props';

let CLASS_ROOT = 'notification';

export default class Notification extends Component {
  render () {
    let classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}--status-${this.props.status.toLowerCase()}`,
      `background-color-index-${this.props.status.toLowerCase()}`,
      this.props.className,
      {
        [`${CLASS_ROOT}--${this.props.size}`]: this.props.size,
        [`${CLASS_ROOT}--disabled`]: !this.props.onClick
      }
    );

    let status;
    if (this.props.status) {
      status = (
        <StatusIcon className={`${CLASS_ROOT}__status`}
          value={this.props.status} size={this.props.size} />
      );
    }

    let state;
    if (this.props.state) {
      state = (
        <div className={`${CLASS_ROOT}__state`}>{this.props.state}</div>
      );
    }

    let progress;
    if (this.props.percentComplete || 0 === this.props.percentComplete) {
      progress = (
        <Meter units="%"
          series={[{
            value: this.props.percentComplete,
            label: '',
            colorIndex: 'light-1'
          }]} />
      );
    }

    let timestamp;
    if (this.props.timestamp) {
      let timestampFormatted = this.props.timestamp.toString();
      if (this.context.intl) {
        timestampFormatted = (
          <FormattedDate value={this.props.timestamp}
            weekday="long"
            day="numeric"
            month="long"
            year="numeric"
            hour="numeric"
            minute="numeric"
            second="numeric" />
        );
      }

      timestamp = (
        <div className={`${CLASS_ROOT}__timestamp`}>
          {timestampFormatted}
        </div>
      );
    }

    let boxProps = Props.pick(this.props, Object.keys(Box.propTypes));

    return (
      <Box {...boxProps} className={classes} direction="row" responsive={false}>
        {status}
        <Box>
          <span className={`${CLASS_ROOT}__message`}>
            {this.props.message}
          </span>
          {this.props.context}
          {timestamp}
          {state}
          {progress}
          {this.props.children}
        </Box>
      </Box>
    );
  }
};

Notification.propTypes = {
  context: PropTypes.node,
  message: PropTypes.string.isRequired,
  percentComplete: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  state: PropTypes.string,
  status: PropTypes.string,
  timestamp: PropTypes.object, // Date
  ...Box.propTypes
};

Notification.contextTypes = {
  intl: PropTypes.object
};

Notification.defaultProps = {
  flush: true,
  status: 'unknown',
  pad: 'medium'
};
