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
      `${CLASS_ROOT}-platform-dropbox`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'platform-dropbox');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fillRule="evenodd" d="M11.9998865,5.09510125 L16.9063349,1 L24,5.6316555 L19.1337313,9.52840727 L24,13.4255694 L16.9063349,18.0572249 L12.0001376,13.9621062 L7.09366507,18.0574545 L0,13.425799 L4.86638378,9.52849941 L0,5.6316555 L7.09366507,1 L11.9998865,5.09510125 Z M11.9998861,5.17831096 L4.95498114,9.52849791 L11.9998164,13.8787284 L19.0451308,9.52856802 L11.9998861,5.17831096 Z M11.9315598,14.7799043 L16.9097799,18.91089 L19.0401531,17.5200383 L19.0401531,19.0792344 L11.9315598,23.3420478 L4.82296651,19.0792344 L4.82296651,17.5200383 L6.95333971,18.91089 L11.9315598,14.7799043 Z"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'PlatformDropbox';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

