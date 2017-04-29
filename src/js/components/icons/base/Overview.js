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
      `${CLASS_ROOT}-overview`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'overview');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M18.5,21 C20.9852814,21 23,18.9852814 23,16.5 C23,14.0147186 20.9852814,12 18.5,12 C16.0147186,12 14,14.0147186 14,16.5 C14,18.9852814 16.0147186,21 18.5,21 L18.5,21 Z M10,7 L14,7 M1.5,14.5 C1.5,14.5 5.5,5 6,4 C6.5,3 7.5,3 8,3 C8.5,3 10,3 10,5 L10,16 M5.5,21 C3.01471863,21 1,18.9852814 1,16.5 C1,14.0147186 3.01471863,12 5.5,12 C7.98528137,12 10,14.0147186 10,16.5 C10,18.9852814 7.98528137,21 5.5,21 L5.5,21 L5.5,21 Z M22.5,14.5 C22.5,14.5 18.5,5 18,4 C17.5,3 16.5,3 16,3 C15.5,3 14,3 14,5 L14,16 M10,16 L14,16"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'Overview';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

