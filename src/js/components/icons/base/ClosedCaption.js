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
      `${CLASS_ROOT}-closed-caption`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'closed-caption');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M1,12 C1,5 2.5,4 12,4 C21.5,4 23,5 23,12 C23,19 21.5,20 12,20 C2.5,20 1,19 1,12 Z M5.25,14 C5.25,15.5 6,16 7.75,16 C9.5,16 10.25,15.5 10.25,14 L9.97861679,14 C9.97861671,15.25 8.97905547,16 7.75,16 C6.52094453,16 5.52138329,15.25 5.52138321,14 L5.52138321,10 C5.5,8.75 6.5,8 7.75,8 C9,8 10,8.75 9.97861679,10 L10.25,10 C10.25,8.75 9.2286998,8 7.75,8 C6.2713002,8 5.25,8.75 5.25,10 L5.25,14 Z M13.25,14 C13.25,15.5 14,16 15.75,16 C17.5,16 18.25,15.5 18.25,14 L17.9786168,14 C17.9786167,15.25 16.9790555,16 15.75,16 C14.5209445,16 13.5213833,15.25 13.5213832,14 L13.5213832,10 C13.5,8.75 14.5,8 15.75,8 C17,8 18,8.75 17.9786168,10 L18.25,10 C18.25,8.75 17.2286998,8 15.75,8 C14.2713002,8 13.25,8.75 13.25,10 L13.25,14 Z"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'ClosedCaption';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

