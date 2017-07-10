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
      `${CLASS_ROOT}-service-play`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'service-play');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M7,13 C10.3137085,13 13,10.3137085 13,7 C13,3.6862915 10.3137085,1 7,1 C3.6862915,1 1,3.6862915 1,7 C1,10.3137085 3.6862915,13 7,13 Z M14.995457,16.6569808 L14.995457,16.6569808 C15.6222982,16.8791083 16.2970312,17 17,17 C20.3137085,17 23,14.3137085 23,11 C23,7.6862915 20.3137085,5 17,5 C15.5133616,5 14.1530044,5.54067366 13.1048383,6.43611087 M4.82356548,12.6921643 C3.69893809,13.7826979 3,15.3097261 3,17 C3,20.3137085 5.6862915,23 9,23 L9,23 C12.3137085,23 15,20.3137085 15,17 C15,14.4351166 13.3906156,12.2461251 11.1265973,11.3877758 M6.5,6 L8,7 L6.5,8 L6.5,6 Z"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'ServicePlay';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

