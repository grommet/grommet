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
      `${CLASS_ROOT}-server-cluster`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'server-cluster');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M1,8 L23,8 L23,1 L1,1 L1,8 Z M11,5 L12,5 L12,4 L11,4 L11,5 Z M19,5 L20,5 L20,4 L19,4 L19,5 Z M15,5 L16,5 L16,4 L15,4 L15,5 Z M11,12 L12,12 L12,11 L11,11 L11,12 Z M19,12 L20,12 L20,11 L19,11 L19,12 Z M15,12 L16,12 L16,11 L15,11 L15,12 Z M11,19 L12,19 L12,18 L11,18 L11,19 Z M19,19 L20,19 L20,18 L19,18 L19,19 Z M15,19 L16,19 L16,18 L15,18 L15,19 Z M1,15 L23,15 L23,8 L1,8 L1,15 Z M1,22 L23,22 L23,15 L1,15 L1,22 Z M21,23 L3,23"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'ServerCluster';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

