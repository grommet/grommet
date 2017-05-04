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
      `${CLASS_ROOT}-toast`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'toast');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M8,2 C5.790861,2 4,3.790861 4,6 C4,7.48056471 4.80439726,8.77325238 6,9.46487122 L6,16 L18,16 L18,9.46487122 C19.1956027,8.77325238 20,7.48056471 20,6 C20,3.790861 18.209139,2 16,2 L8,2 Z M11.3212774,6.87413911 C11.600007,6.39136541 12.209917,6.22167659 12.700101,6.50468445 L14.4159244,7.49531555 C14.8986981,7.77404508 15.0683869,8.38395511 14.7853791,8.87413911 L13.794748,10.5899625 C13.5160184,11.0727362 12.9061084,11.242425 12.4159244,10.9594172 L10.700101,9.96878606 C10.2173273,9.69005654 10.0476385,9.0801465 10.3306463,8.58996251 L11.3212774,6.87413911 Z M8,18 L8,20 M12,18 L12,23 M16,18 L16,21"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'Toast';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

