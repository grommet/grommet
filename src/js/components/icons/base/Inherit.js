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
      `${CLASS_ROOT}-inherit`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'inherit');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#231F1F" strokeWidth="2" d="M17,18 L12,15 L17,18 Z M7,18 L12,15 L12,11 M17,20 C17,21.657 18.343,23 20,23 C21.657,23 23,21.657 23,20 C23,18.343 21.657,17 20,17 C18.343,17 17,18.343 17,20 L17,20 L17,20 Z M4,17 C2.343,17 1,18.343 1,20 C1,21.657 2.343,23 4,23 C5.657,23 7,21.657 7,20 C7,18.343 5.657,17 4,17 L4,17 L4,17 Z M17,6 C17,8.761 14.761,11 12,11 C9.239,11 7,8.761 7,6 C7,3.239 9.239,1 12,1 C14.761,1 17,3.239 17,6 L17,6 L17,6 Z"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'Inherit';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

