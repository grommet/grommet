// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';
import Intl from '../../../utils/Intl';
import Props from '../../../utils/Props';

const CLASS_ROOT = CSSClassnames.CONTROL_ICON;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class Icon extends Component {
  render () {
    const { className, colorIndex } = this.props;
    let { a11yTitle, size, responsive } = this.props;
    let { intl } = this.context;

    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-gamepad`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'gamepad');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M12,16 C11,16 10.0029053,16.9956421 9,18 C8.00290526,18.9985389 7.99709474,19.0029053 7,20 C4,23 1,21 1,18 C1,15 1.00000002,13.969213 1,11 C0.999999979,8.03078698 3,6 6,6 C8.00000008,6 12,6 12,6 C12,6 15.9999999,6 18,6 C21,6 23,8.03078698 23,11 C23,13.969213 23,15 23,18 C23,21 20,23 17,20 C16.0029053,19.0029053 15.9970947,18.9985389 15,18 C13.9970947,16.9956421 13,16 12,16 Z M12,6 L12,2 M19,15 C19.5522847,15 20,14.5522847 20,14 C20,13.4477153 19.5522847,13 19,13 C18.4477153,13 18,13.4477153 18,14 C18,14.5522847 18.4477153,15 19,15 Z M15,12 C15.5522847,12 16,11.5522847 16,11 C16,10.4477153 15.5522847,10 15,10 C14.4477153,10 14,10.4477153 14,11 C14,11.5522847 14.4477153,12 15,12 Z M4,12 L10,12 M7,9 L7,15"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'Gamepad';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

