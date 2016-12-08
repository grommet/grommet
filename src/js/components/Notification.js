// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import { FormattedDate } from 'react-intl';
import Intl from '../utils/Intl';
import Box from './Box';
import Value from './Value';
import Animate from './Animate';
import Meter from './Meter';
import Button from './Button';
import StatusIcon from './icons/Status';
import CloseIcon from './icons/base/Close';
import Props from '../utils/Props';
import CSSClassnames from '../utils/CSSClassnames';
import Announcer from '../utils/Announcer';
import { checkDarkBackground } from '../utils/DOM';

const CLASS_ROOT = CSSClassnames.NOTIFICATION;
const BACKGROUND_COLOR_INDEX = CSSClassnames.BACKGROUND_COLOR_INDEX;

export default class Notification extends Component {

  constructor () {
    super();
    this._announce = this._announce.bind(this);
    this._setDarkBackground = this._setDarkBackground.bind(this);
    this.state = {};
  }

  componentDidMount () {
    this._announce();
    // Measure the actual background color brightness to determine whether
    // to set a dark or light context.
    this._setDarkBackground();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.status !== this.props.status) {
      this.setState({ updateDarkBackground: true });
    }
  }

  componentDidUpdate () {
    this._announce();
    if (this.state.updateDarkBackground) {
      this.setState({ updateDarkBackground: false });
      this._setDarkBackground();
    }
  }

  _setDarkBackground () {
    const { status } = this.props;
    const box = findDOMNode(this._containerRef);
    checkDarkBackground(status, box,
      (darkBackground) => this.setState({ darkBackground }));
  }

  _announce () {
    const { announce, message } = this.props;
    const { intl } = this.context;
    if (announce) {
      const notificationMessage = Intl.getMessage(intl, 'Notification');
      Announcer.announce(`${notificationMessage}: ${message}`);
    }
  }

  _backgroundContextClass (darkBackground) {
    let result;
    if (undefined === darkBackground) {
      result = `${BACKGROUND_COLOR_INDEX}--pending`;
    } else if (darkBackground) {
      result = `${BACKGROUND_COLOR_INDEX}--dark`;
    } else {
      result = `${BACKGROUND_COLOR_INDEX}--light`;
    }
    return result;
  }

  render () {
    const {
      children, className, closer, context, percentComplete, message,
      onClose, timestamp, size, state, status
    } = this.props;
    const { intl } = this.context;
    const { darkBackground } = this.state;
    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}--status-${status.toLowerCase()}`,
      `${BACKGROUND_COLOR_INDEX}-${status.toLowerCase()}`,
      this._backgroundContextClass(darkBackground),
      {
        [`${CLASS_ROOT}--${size}`]: size
      },
      className
    );

    let statusNode;
    if (status) {
      statusNode = (
        <StatusIcon className={`${CLASS_ROOT}__status`}
          value={status} size={size} />
      );
    }

    let stateNode;
    if (state) {
      stateNode = (
        <div className={`${CLASS_ROOT}__state`}>{state}</div>
      );
    }

    let progress;
    if (percentComplete || 0 === percentComplete) {
      progress = (
        <Box direction='row' align='center' pad={{ between: 'medium' }}>
          <Meter
            series={[{
              value: percentComplete,
              colorIndex: 'light-1'
            }]}/>
          <Value value={percentComplete} units='%' size='small'/>
        </Box>
      );
    }

    let timestampNode;
    if (timestamp) {
      let timestampFormatted = timestamp.toString();
      if (intl) {
        timestampFormatted = (
          <FormattedDate value={timestamp} weekday='long' day='numeric'
            month='long' year='numeric' hour='numeric' minute='numeric'
            second='numeric' />
        );
      }

      timestampNode = (
        <div className={`${CLASS_ROOT}__timestamp`}>
          {timestampFormatted}
        </div>
      );
    }

    let closerNode;
    if (typeof closer === 'object') {
      closerNode = closer;
    } else if (onClose && closer) {
      closerNode = (
        <Button plain={true} onClick={onClose}
          icon={<CloseIcon className={`${CLASS_ROOT}__close`} />}
          a11yTitle={
            Intl.getMessage(intl, 'Close Notification')
          } />
      );
    }

    const boxProps = Props.pick(this.props, Object.keys(Box.propTypes));
    const restProps =
      Props.omit(this.props, Object.keys(Notification.propTypes));
    boxProps.announce = false;
    const fullBox =
      boxProps.hasOwnProperty('full') ? boxProps.full : undefined;

    if (size && typeof size === 'string') {
      // don't transfer size to Box since it means something different
      delete boxProps.size;
    }
    return (
      <Animate enter={{ animation: 'fade', duration: 1000 }}
        leave={{ animation: 'fade', duration: 1000 }}>
        <Box ref={(ref) => this._containerRef = ref}
          {...restProps} {...boxProps} className={classes}
          pad='small' direction='row' align='start' responsive={false}
          full={fullBox}>
          <Box pad='small'>
            {statusNode}
          </Box>
          <Box flex={true} pad='small'>
            <span className={`${CLASS_ROOT}__message`}>
              {message}
            </span>
            {context}
            {timestampNode}
            {stateNode}
            {progress}
            {children}
          </Box>
          {closerNode}
        </Box>
      </Animate>
    );
  }
};

Notification.propTypes = {
  closer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.bool
  ]),
  context: PropTypes.node,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
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
  closer: false,
  status: 'unknown',
  pad: 'medium'
};
