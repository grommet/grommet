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
      `${CLASS_ROOT}-system`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'system');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M1,19 L23,19 L23,1 L1,1 L1,19 Z M5,23 L19,23 L5,23 Z M8,23 L16,23 L16,19 L8,19 L8,23 Z M7.757,5.757 L9.879,7.879 L7.757,5.757 Z M9,10 L6,10 L9,10 Z M9.879,12.121 L7.757,14.243 L9.879,12.121 Z M12,13 L12,16 L12,13 Z M14.121,12.121 L16.243,14.243 L14.121,12.121 Z M18,10 L15,10 L18,10 Z M16.243,5.757 L14.121,7.879 L16.243,5.757 Z M12,7 L12,4 L12,7 Z M12,7 C10.343,7 9,8.343 9,10 C9,11.657 10.343,13 12,13 C13.657,13 15,11.657 15,10 C15,8.343 13.657,7 12,7 L12,7 Z"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'System';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

