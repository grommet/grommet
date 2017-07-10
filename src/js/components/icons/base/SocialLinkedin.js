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
      `${CLASS_ROOT}-social-linkedin`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'social-linkedin');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="#0077B5" fillRule="evenodd" d="M20.45175,20.45025 L16.89225,20.45025 L16.89225,14.88075 C16.89225,13.5525 16.86975,11.844 15.04275,11.844 C13.191,11.844 12.90825,13.2915 12.90825,14.7855 L12.90825,20.45025 L9.3525,20.45025 L9.3525,8.997 L12.765,8.997 L12.765,10.563 L12.81375,10.563 C13.2885,9.66225 14.4495,8.71275 16.18125,8.71275 C19.78575,8.71275 20.45175,11.08425 20.45175,14.169 L20.45175,20.45025 Z M5.33925,7.4325 C4.1955,7.4325 3.27375,6.50775 3.27375,5.36775 C3.27375,4.2285 4.1955,3.30375 5.33925,3.30375 C6.47775,3.30375 7.4025,4.2285 7.4025,5.36775 C7.4025,6.50775 6.47775,7.4325 5.33925,7.4325 L5.33925,7.4325 Z M7.11975,20.45025 L3.5565,20.45025 L3.5565,8.997 L7.11975,8.997 L7.11975,20.45025 Z M23.00025,0 L1.0005,0 C0.44775,0 0,0.44775 0,0.99975 L0,22.9995 C0,23.55225 0.44775,24 1.0005,24 L23.00025,24 C23.55225,24 24,23.55225 24,22.9995 L24,0.99975 C24,0.44775 23.55225,0 23.00025,0 L23.00025,0 Z" stroke="none"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'SocialLinkedin';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

