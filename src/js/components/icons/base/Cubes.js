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
      `${CLASS_ROOT}-cubes`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'cubes');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeWidth="2" d="M6.5,10.5 L12,13.5 L17.5,10.5 L17.5,4.5 L12,1.5 L6.5,4.5 L6.5,10.5 Z M6.5,4.5 L12,7.5 L17.5,4.5 M12,7.5 L12,13.5 L12,7.5 Z M1,19.5 L6.5,22.5 L12,19.5 L12,13.5 L6.5,10.5 L1,13.5 L1,19.5 Z M1,13.5 L6.5,16.5 L12,13.5 M6.5,16.5 L6.5,22.5 L6.5,16.5 Z M12,19.5 L17.5,22.5 L23,19.5 L23,13.5 L17.5,10.5 L12,13.5 L12,19.5 Z M12,13.5 L17.5,16.5 L23,13.5 M17.5,16.5 L17.5,22.5 L17.5,16.5 Z"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'Cubes';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

