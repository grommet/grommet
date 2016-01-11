// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { FormattedDate } from 'react-intl';
import merge from 'lodash/object/merge';
import pick from 'lodash/object/pick';
import keys from 'lodash/object/keys';
import Box from './Box';
import Meter from './Meter';

import StatusIcon from './icons/Status';

var CLASS_ROOT = "notification";

export default class Notification extends Component {
  render() {
    var classes = [CLASS_ROOT];
    var other = pick(this.props, keys(Box.propTypes));
    classes.push(CLASS_ROOT + "--" + this.props.status.toLowerCase());
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var status;
    if (this.props.status) {
      status = (
        <StatusIcon className={CLASS_ROOT + "__status"}
        value={this.props.status} small={true} />
      );
    }

    var state;
    if (this.props.state) {
      state = <div className={CLASS_ROOT + "__state"}>{this.props.state}</div>;
    }

    var progress;
    if (this.props.percentComplete || 0 === this.props.percentComplete) {
      progress = (
        <Meter units="%"
          series={[{value: this.props.percentComplete, label: '', colorIndex: 'light-1'}]}
          size="large" />
      );
    }

    var timestamp;
    if (this.props.timestamp) {
      var timestampFormatted = (
        <FormattedDate value={this.props.timestamp}
          weekday="long"
          day="numeric"
          month="long"
          year="numeric"
          hour="numeric"
          minute="numeric"
          second="numeric" />
      );

      timestamp = (
        <div className={CLASS_ROOT + "__timestamp"}>
          {timestampFormatted}
        </div>
      );
    }

    return (
      <Box className={classes.join(' ')} {...other}>
        <Box direction="row" responsive={false}>
          {status}
          <span className={CLASS_ROOT + "__message"}>
            {this.props.message}
          </span>
        </Box>
        {timestamp}
        {state}
        {progress}
        {this.props.children}
      </Box>
    );
  }
}

Notification.defaultProps = {
  flush: true,
  status: 'unknown',
  pad: 'medium'
};

Notification.propTypes = merge({
  message: PropTypes.string.isRequired,
  percentComplete: PropTypes.number,
  state: PropTypes.string,
  status: PropTypes.string,
  timestamp: PropTypes.object // Date
}, Box.propTypes);
