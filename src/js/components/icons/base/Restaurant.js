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
      `${CLASS_ROOT}-restaurant`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'restaurant');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M19,18 L5,18 L19,18 Z M12,18 L12,12 L12,18 Z M15,18 L15,14 L15,18 Z M9,18 L9,14 L9,18 Z M19,22 L19,11.3292943 C20.1651924,10.9174579 21,9.80621883 21,8.5 C21,6.84314575 19.6568542,5.5 18,5.5 C17.6192862,5.5 17.2551359,5.57091725 16.9200387,5.7002623 C16.5495238,3.87433936 14.4600194,2 12,2 C9.53998063,2 7.45047616,3.87433936 7.07996126,5.7002623 C6.74486408,5.57091725 6.38071384,5.5 6,5.5 C4.34314575,5.5 3,6.84314575 3,8.5 C3,9.80621883 3.83480763,10.9174579 5,11.3292943 L5,22 L19,22 Z"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'Restaurant';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

