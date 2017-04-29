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
      `${CLASS_ROOT}-social-product-hunt`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'social-product-hunt');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="#DA552F" fillRule="evenodd" d="M13.59975,8.4 L13.59975,8.4 L10.2,8.4 L10.2,12 L13.59975,12 C14.59425,12 15.39975,11.19375 15.39975,10.2 C15.39975,9.20625 14.59425,8.4 13.59975,8.4 M13.59975,14.4 L13.59975,14.4 L10.2,14.4 L10.2,18 L7.8,18 L7.8,6 L13.59975,6 C15.9195,6 17.79975,7.88025 17.79975,10.2 C17.79975,12.51975 15.9195,14.4 13.59975,14.4 M12,0 C5.37225,0 0,5.37225 0,12 C0,18.62775 5.37225,24 12,24 C18.627,24 24,18.62775 24,12 C24,5.37225 18.627,0 12,0" stroke="none"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'SocialProductHunt';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

