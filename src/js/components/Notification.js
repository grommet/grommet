// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { FormattedDate } from 'react-intl';
import merge from 'lodash/object/merge';
import pick from 'lodash/object/pick';
import keys from 'lodash/object/keys';
import Box from './Box';
import Meter from './Meter';

import StatusIcon from './icons/Status';

let CLASS_ROOT = "notification";

export default class Notification extends Component {
  render() {
    let classes = [CLASS_ROOT];
    let other = pick(this.props, keys(Box.propTypes));
    classes.push(`${CLASS_ROOT}--${this.props.status.toLowerCase()}`);
    classes.push(`background-color-index-${this.props.status.toLowerCase()}`);
    if (this.props.size) {
      classes.push(`${CLASS_ROOT}--${this.props.size.toLowerCase()}`);
    }
    if (! this.props.onClick) {
      classes.push(`${CLASS_ROOT}--disabled`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

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
          }]}
          size="large" />
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

    return (
      <Box className={classes.join(' ')} direction="row" responsive={false}
        {...other}>
        {status}
        <Box>
          <span className={`${CLASS_ROOT}__message`}>
            {this.props.message}
          </span>
          {timestamp}
          {state}
          {progress}
          {this.props.children}
        </Box>
      </Box>
    );
  }
}

Notification.propTypes = merge({
  message: PropTypes.string.isRequired,
  percentComplete: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  state: PropTypes.string,
  status: PropTypes.string,
  timestamp: PropTypes.object // Date
}, Box.propTypes);

Notification.contextTypes = {
  intl: PropTypes.object
};

Notification.defaultProps = {
  flush: true,
  status: 'unknown',
  pad: 'medium'
};
