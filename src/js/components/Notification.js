// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { FormattedDate } from 'react-intl';
import Box from './Box';
import Meter from './Meter';
import StatusIcon from './icons/Status';
import Props from '../utils/Props';

let CLASS_ROOT = 'notification';

const Notification = (props, context) => {
  let classes = classnames(
    CLASS_ROOT,
    `${CLASS_ROOT}--status-${props.status.toLowerCase()}`,
    `background-color-index-${props.status.toLowerCase()}`,
    props.className,
    {
      [`${CLASS_ROOT}--${props.size}`]: props.size,
      [`${CLASS_ROOT}--disabled`]: !props.onClick
    }
  );

  let status;
  if (props.status) {
    status = (
      <StatusIcon className={`${CLASS_ROOT}__status`}
        value={props.status} size={props.size} />
    );
  }

  let state;
  if (props.state) {
    state = (
      <div className={`${CLASS_ROOT}__state`}>{props.state}</div>
    );
  }

  let progress;
  if (props.percentComplete || 0 === props.percentComplete) {
    progress = (
      <Meter units="%"
        series={[{
          value: props.percentComplete,
          label: '',
          colorIndex: 'light-1'
        }]}
        size="large" />
    );
  }

  let timestamp;
  if (props.timestamp) {
    let timestampFormatted = props.timestamp.toString();
    if (context.intl) {
      timestampFormatted = (
        <FormattedDate value={props.timestamp}
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

  let boxProps = Props.pick(props, Box);

  return (
    <Box {...boxProps} className={classes} direction="row" responsive={false}>
      {status}
      <Box>
        <span className={`${CLASS_ROOT}__message`}>
          {props.message}
        </span>
        {props.context}
        {timestamp}
        {state}
        {progress}
        {props.children}
      </Box>
    </Box>
  );
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

Notification.displayName = 'Notification';

export default Notification;
