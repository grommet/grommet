import PropTypes from 'prop-types';
// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
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
      `${CLASS_ROOT}-robot`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'robot');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M18.3482396,15.9535197 C18.7664592,15.0561341 19,14.0553403 19,13 C19,9.13400675 15.8659932,6 12,6 C8.13400675,6 5,9.13400675 5,13 C5,14.1167756 5.2615228,15.1724692 5.72666673,16.1091793 L5.72666673,16.1091793 M12,3 C12.5522847,3 13,2.55228475 13,2 C13,1.44771525 12.5522847,1 12,1 C11.4477153,1 11,1.44771525 11,2 C11,2.55228475 11.4477153,3 12,3 Z M12,23 C12.5522847,23 13,22.5522847 13,22 C13,21.4477153 12.5522847,21 12,21 C11.4477153,21 11,21.4477153 11,22 C11,22.5522847 11.4477153,23 12,23 Z M12,6 L12,3 M9,14 C9.55228475,14 10,13.5522847 10,13 C10,12.4477153 9.55228475,12 9,12 C8.44771525,12 8,12.4477153 8,13 C8,13.5522847 8.44771525,14 9,14 Z M15,14 C15.5522847,14 16,13.5522847 16,13 C16,12.4477153 15.5522847,12 15,12 C14.4477153,12 14,12.4477153 14,13 C14,13.5522847 14.4477153,14 15,14 Z M6,18.9876876 L5,16 C5,16 5.07242747,15.2283988 5.5,15.5 C6.43069361,16.0911921 8.57396448,17 12,17 C15.5536669,17 17.6181635,16.0844828 18.5,15.5 C18.8589052,15.262117 19,16 19,16 L18,18.9876876 C18,18.9876876 17.0049249,20.9999997 12,21 C6.99507512,21.0000003 6,18.9876876 6,18.9876876 Z"/></svg>;
  }
}

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'Robot';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

