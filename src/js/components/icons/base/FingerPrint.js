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
      `${CLASS_ROOT}-finger-print`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'finger-print');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2" d="M14,15 C14,13.8954305 13.1045695,13 12,13 C10.8954305,13 10,13.8954305 10,15 C10,16.1045695 10.8954305,17 12,17 L12,17 M12,20 C9.23857625,20 7,17.7614237 7,15 C7,12.2385763 9.23857625,10 12,10 C14.7614237,10 17,12.2385763 17,15 C17,15.8284271 17.6715729,16.5 18.5,16.5 C19.3284271,16.5 20,15.8284271 20,15 C20,10.581722 16.418278,7 12,7 C7.581722,7 4,10.581722 4,15 C4,19.418278 7.581722,23 12,23 L14,23 M1,15 C1,17.6720798 1.95275656,20.1216314 3.53708682,22.0274719 M20.5202529,8.04207866 C18.5030558,5.574886 15.4354451,4 12,4 C8.59642702,4 5.55389491,5.54579976 3.53616098,7.97364199 M18.5259055,2.61083013 C16.577286,1.58228463 14.3566429,1 12,1 C9.66126395,1 7.45646883,1.57346929 5.51856118,2.58746134"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'FingerPrint';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

