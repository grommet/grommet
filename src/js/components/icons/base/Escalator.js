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
      `${CLASS_ROOT}-escalator`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'escalator');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2" d="M22,9 C22,7.8954305 21.1017394,7 20.0020869,7 L16,7 L6,17 L4,17 C2.8954305,17 2,17.8877296 2,19 L2,19 C2,20.1045695 2.89826062,21 3.99791312,21 L8,21 L18,11 L20,11 C21.1045695,11 22,10.1122704 22,9 L22,9 Z M7,9 C7.55228475,9 8,8.55228475 8,8 C8,7.44771525 7.55228475,7 7,7 C6.44771525,7 6,7.44771525 6,8 C6,8.55228475 6.44771525,9 7,9 Z M7,15 L7,12.495389 C7,12.2217932 7.23193359,12 7.5,12 L7.5,12 C7.77614237,12 8,12.214035 8,12.5046844 L8,14 L7,15 Z M12,4 C12.5522847,4 13,3.55228475 13,3 C13,2.44771525 12.5522847,2 12,2 C11.4477153,2 11,2.44771525 11,3 C11,3.55228475 11.4477153,4 12,4 Z M12,10 L12,7.49538898 C12,7.2217932 12.2319336,7 12.5,7 L12.5,7 C12.7761424,7 13,7.21403503 13,7.50468445 L13,9 L12,10 Z"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'Escalator';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

