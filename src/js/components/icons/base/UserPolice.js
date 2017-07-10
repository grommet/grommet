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
      `${CLASS_ROOT}-user-police`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'user-police');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M16,14 C18.3736719,15.1826446 20,17.6506255 20,21 L20,23 L4,23 L4,21 C4,17.6457258 5.6310898,15.1754259 8,14 M12,15 C15.2602409,15 17.9031883,12.3141492 17.9031883,9.00098429 C17.9031883,8.29933805 18.1210147,7.62582606 17.9031883,7 M6.09318017,7 C5.88352479,7.61511425 6.09318017,8.31344562 6.09318017,9.00098429 C6.09318017,12.3141492 8.73775349,15 12,15 L12,15 M6,8 L18,8 L21,4 C19.0884181,2.26537447 15.7904958,1 12,1 C8.16364606,1 4.83185613,2.29617718 3,4 L6,8 L6,8 L6,8 Z M12,5 C12.5522847,5 13,4.55228475 13,4 C13,4 11,4 11,4 C11,4.55228475 11.4477153,5 12,5 L12,5 L12,5 Z"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'UserPolice';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

