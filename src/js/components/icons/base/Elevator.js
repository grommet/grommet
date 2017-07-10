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
      `${CLASS_ROOT}-elevator`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'elevator');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2" d="M1,2.991155 C1,1.89147046 1.88967395,1 2.991155,1 L21.008845,1 C22.1085295,1 23,1.88967395 23,2.991155 L23,21.008845 C23,22.1085295 22.1103261,23 21.008845,23 L2.991155,23 C1.89147046,23 1,22.1103261 1,21.008845 L1,2.991155 Z M16.5,8 L18,10 L15,10 L16.5,8 Z M16.5,16 L18,14 L15,14 L16.5,16 Z M5,13 L6.55613518,9.88772964 C6.80127495,9.3974501 7.44386482,9 8,9 L8,9 C8.55228475,9 9.19907951,9.39815903 9.44386482,9.88772964 L11,13 M6.5,18 L7.75,10 L8,10 L8.25,10 L9.5,18 M8,7 C8.55228475,7 9,6.55228475 9,6 C9,5.44771525 8.55228475,5 8,5 C7.44771525,5 7,5.44771525 7,6 C7,6.55228475 7.44771525,7 8,7 Z"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'Elevator';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

