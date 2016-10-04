// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import OK from './status/OK';
import CriticalStatus from './status/CriticalStatus';
import Warning from './status/Warning';
import Disabled from './status/Disabled';
import Unknown from './status/Unknown';
import Blank from './status/Blank';
import Label from './status/Label';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.STATUS_ICON;

export default class Status extends Component {

  render () {
    let { className, size, value, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${size}`]: size
      },
      className
    );

    let icon = <span>{'?'}</span>;
    switch (value.toLowerCase()) {
      case 'ok':
      case 'normal':
        icon = <OK className={classes} {...props} />;
        break;
      case 'warning':
        icon = <Warning className={classes} {...props} />;
        break;
      case 'critical':
        icon = <CriticalStatus className={classes} {...props} />;
        break;
      case 'disabled':
        icon = <Disabled className={classes} {...props} />;
        break;
      case 'unknown':
        icon = <Unknown className={classes} {...props} />;
        break;
      case 'blank':
        icon = <Blank className={classes} {...props} />;
        break;
      case 'label':
        icon = <Label className={classes} {...props} />;
        break;
    }
    return icon;
  }
}

Status.defaultProps = {
  value: 'unknown'
};

Status.propTypes = {
  a11yTitle: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.oneOf(['critical', 'warning', 'ok', 'unknown',
    'disabled', 'label',
    'Critical', 'Warning', 'OK', 'Unknown', 'Disabled', 'Label', 'blank'])
};
