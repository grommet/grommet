// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';
import Intl from '../../../utils/Intl';
import Props from '../../../utils/Props';

const CLASS_ROOT = CSSClassnames.CONTROL_ICON;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class Icon extends Component {
  componentDidMount() {
    const { skipWarn } = this.props;
    if (!skipWarn) {
      console.warn(
        'Base icons are now deprecated, use raw svg with grommet-icon-loader'
      );
    }
  }
  render () {
    const { className, colorIndex } = this.props;
    let { a11yTitle, size, responsive } = this.props;
    let { intl } = this.context;

    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-attraction`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'attraction');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><g fill="none" fillRule="evenodd"><polygon stroke="#000" strokeWidth="2" points="12 4 21 10 21 12 3 12 3 10" fill="none"/><polygon stroke="none" fill="#000" points="12 0 15.5 1.25 12 2.5"/><path stroke="#000" strokeWidth="2" d="M4.5,12 L19.5,12 C19.5,16.1666667 21,22 21,22 L3,22 C3,22 4.5,16.1666667 4.5,12 Z" fill="none"/><polygon stroke="none" fill="#000" strokeWidth="2" points="14 15.5 16 22 12 22"/></g></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'Attraction';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool,
  skipWarn: PropTypes.bool
};

