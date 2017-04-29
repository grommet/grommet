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
      `${CLASS_ROOT}-achievement`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'achievement');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M10.3248685,14.7630919 C7.82620532,14.038202 6,11.7325889 6,9 L6,1 L18,1 L18,10 M6,3 L1,3 L1,7 C1,9.509 2.791,11 5,11 L6,11 M20.0335555,10.884915 C21.7416567,10.4908882 23,9.10306372 23,7 L23,3 L18,3 M10,19 L5,19 L5,23 L16.5,23 M16.5,10 C12.9101429,10 10,12.9101429 10,16.5 C10,20.0898571 12.9101429,23 16.5,23 C20.0898571,23 23,20.0898571 23,16.5 C23,12.9101429 20.0898571,10 16.5,10 L16.5,10 Z M20,14 L15.5,18.5 L13,16 M10.2056405,15.4240751 C8.89754812,16.0817472 8,17.4360568 8,19"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'Achievement';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

