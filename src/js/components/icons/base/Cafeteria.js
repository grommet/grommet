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
      `${CLASS_ROOT}-cafeteria`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'cafeteria');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M12,1 L12,7.99967027 C12,9.65670662 10.6526091,11 9.00313032,11 L5.99686968,11 C4.34174426,11 3,9.6513555 3,7.99967027 L3,1 M6,7 C6,7 6,6.54902482 6,6.00922203 L6,1 M9,7 C9,7 9,6.54902482 9,6.00922203 L9,1 M6,11 L6,21.5044548 C6,22.3304216 6.66579723,23 7.5,23 L7.5,23 C8.32842712,23 9,22.3204455 9,21.5044548 L9,11 M15,18 L15,21.4998351 C15,22.3283533 15.6657972,23 16.5,23 L16.5,23 C17.3284271,23 18,22.3316845 18,21.4952612 L18,15 C18,15 21,15 21,12 C21,9 21,10 21,7 C21,4 19,2 15,2 C15,2 15,9.99456145 15,18 L15,18 Z"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'Cafeteria';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

