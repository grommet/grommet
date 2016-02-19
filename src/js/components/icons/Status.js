// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import OK from './status/OK';
import CriticalStatus from './status/CriticalStatus';
import ErrorStatus from './status/ErrorStatus';
import Warning from './status/Warning';
import Disabled from './status/Disabled';
import Unknown from './status/Unknown';
import Blank from './status/Blank';
import Label from './status/Label';

const CLASS_ROOT = "status-icon";

export default class Status extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps (newProps) {
    this.setState(this._stateFromProps(newProps));
  }

  _stateFromProps ({size, small, large}) {
    return {size: size || (small ? 'small' : (large ? 'large' : null))};
  }

  render () {
    let classes = [CLASS_ROOT];
    let { a11yTitle } = this.props;
    let { size } = this.state;

    if (this.props.className) {
      classes.push(this.props.className);
    }
    if (size) {
      classes.push(CLASS_ROOT + "--" + size);
    }
    let className = classes.join(' ');
    let icon = <span>{'?'}</span>;
    switch (this.props.value.toLowerCase()) {
      case 'ok':
      case 'normal':
        icon = <OK className={className} a11yTitle={a11yTitle} />;
        break;
      case 'warning':
        icon = <Warning className={className} a11yTitle={a11yTitle} />;
        break;
      // 'error' is deprecated, use 'critical'
      case 'error':
        icon = <ErrorStatus className={className} a11yTitle={a11yTitle} />;
        break;
      case 'critical':
        icon = <CriticalStatus className={className} a11yTitle={a11yTitle} />;
        break;
      case 'disabled':
        icon = <Disabled className={className} a11yTitle={a11yTitle} />;
        break;
      case 'unknown':
        icon = <Unknown className={className} a11yTitle={a11yTitle} />;
        break;
      case 'blank':
        icon = <Blank className={className} a11yTitle={a11yTitle} />;
        break;
      case 'label':
        icon = <Label className={className} a11yTitle={a11yTitle} />;
        break;
    }
    return icon;
  }
}

Status.defaultProps = {value: 'unknown'};

Status.propTypes = {
  a11yTitle: PropTypes.string,
  large: PropTypes.bool,
  small: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.oneOf(['critical', 'warning', 'ok', 'unknown', 'disabled', 'label',
    'Critical', 'Warning', 'OK', 'Unknown', 'Disabled', 'Label', 'blank'])
};
