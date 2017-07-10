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
      `${CLASS_ROOT}-form-cut`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'form-cut');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M18,7.52380952 L10.1428571,13.8095238 L18,7.52380952 Z M18,15.9047619 L10.1428571,9.61904762 L18,15.9047619 Z M8.57142857,10.1428571 C9.43930461,10.1428571 10.1428571,9.43930461 10.1428571,8.57142857 C10.1428571,7.70355254 9.43930461,7 8.57142857,7 C7.70355254,7 7,7.70355254 7,8.57142857 C7,9.43930461 7.70355254,10.1428571 8.57142857,10.1428571 Z M8.57142857,16.4285714 C9.43930461,16.4285714 10.1428571,15.7250189 10.1428571,14.8571429 C10.1428571,13.9892668 9.43930461,13.2857143 8.57142857,13.2857143 C7.70355254,13.2857143 7,13.9892668 7,14.8571429 C7,15.7250189 7.70355254,16.4285714 8.57142857,16.4285714 Z"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'FormCut';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

