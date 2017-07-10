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
      `${CLASS_ROOT}-detach`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'detach');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M4,4 L20,20 M22,12 C22,12 16.7200572,17.2799437 16.7200572,17.2799437 M15,19 C15,19 13.7932491,20.2067517 13.0000004,21.0000004 C6.99999996,27.0000004 -2.00000007,18.0000004 3.99999994,12.0000004 C4.88551518,11.1144851 6,10 6,10 M8,8 C8,8 10.1615592,5.83844087 13,3.00000008 C17,-0.999999955 23,4.99999994 19,9.00000005 C16.9873313,11.0126688 14,14 14,14 M12,16 C12,16 10.6478339,17.3521667 9.99999995,18.0000004 C7.99999952,20 5,17 6.99999995,15.0000004 C7.50049504,14.4995054 9,13 9,13 M11,11 C10.7388543,11.261146 16,6 16,6"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'Detach';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

