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
      `${CLASS_ROOT}-brand-grommet-outline`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'brand-grommet-outline');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 48 48" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="#865CD6" d="M24,44.5 C35.3218374,44.5 44.5,35.3218374 44.5,24 C44.5,12.6781626 35.3218374,3.5 24,3.5 C12.6781626,3.5 3.5,12.6781626 3.5,24 C3.5,35.3218374 12.6781626,44.5 24,44.5 L24,44.5 Z M24,39.5 C15.4395864,39.5 8.5,32.5604136 8.5,24 C8.5,15.4395864 15.4395864,8.5 24,8.5 C32.5604136,8.5 39.5,15.4395864 39.5,24 C39.5,32.5604136 32.5604136,39.5 24,39.5 L24,39.5 Z" stroke="none"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'BrandGrommetOutline';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

