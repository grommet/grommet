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
      `${CLASS_ROOT}-standards-connectivity`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'standards-connectivity');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="#231F20" fillRule="evenodd" d="M18.0412709,16.5604324 L21.0206354,16.5604324 L21.0206354,9.40681297 L17.6639371,6.05011464 L15.5571569,8.15689486 L18.0412709,10.6410088 L18.0412709,16.5604324 L18.0412709,16.5604324 Z M21.0284966,18.0540452 L16.6891582,18.0540452 L10.6360956,18.0540452 L8.15198166,15.5699312 L9.20537177,14.5165411 L11.2571241,16.5682935 L15.4785457,16.5682935 L11.3200131,12.4018998 L12.3812643,11.3406485 L16.5397969,15.4991811 L16.5397969,11.2777596 L14.4959057,9.23386833 L15.5414347,8.18833934 L10.3766787,3 L5.28267278,3 L5.28267278,3 L0,3 L2.97150344,5.97150344 L2.97150344,5.97936456 L2.98722568,5.97936456 L9.13462168,5.97936456 L11.312152,8.15689486 L8.1283983,11.3406485 L5.950868,9.16311824 L5.950868,7.4729774 L2.97150344,7.4729774 L2.97150344,10.3973141 L8.1283983,15.554209 L6.0294792,17.6531281 L9.38617753,21.0098264 L14.4801834,21.0098264 L24,21.0098264 L24,21.0098264 L21.0284966,18.0540452 L21.0284966,18.0540452 Z" stroke="none"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'StandardsConnectivity';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

