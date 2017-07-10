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
      `${CLASS_ROOT}-business-service`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'business-service');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M4,23 L1,23 L1,5 L1,5 L23,5 L23,23 L16,23 M8,5 L8,1 L8,1 L16,1 L16,5 M9,16 C11.209139,16 13,14.209139 13,12 C13,9.790861 11.209139,8 9,8 C6.790861,8 5,9.790861 5,12 C5,14.209139 6.790861,16 9,16 Z M14.0084967,17.8761594 C14.3255566,17.9570186 14.6577589,18 15,18 C17.209139,18 19,16.209139 19,14 C19,11.790861 17.209139,10 15,10 C14.1717747,10 13.4023412,10.2517171 12.7640287,10.6828219 M7.70199467,15.7255728 C6.67265121,16.4493031 6,17.6460985 6,19 C6,21.209139 7.790861,23 10,23 L10,23 C12.209139,23 14,21.209139 14,19 C14,17.2838286 12.9192205,15.8200868 11.4011657,15.2522789"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'BusinessService';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

