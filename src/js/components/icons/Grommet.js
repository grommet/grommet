// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../../utils/CSSClassnames';
import Intl from '../../utils/Intl';

const CLASS_ROOT = CSSClassnames.LOGO_ICON;

export default class Grommet extends Component {
  render () {
    const { a11yTitle, className, invert, large, size, small } = this.props;
    const { intl } = this.context;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--small`]: small,
        [`${CLASS_ROOT}--large`]: large,
        [`${CLASS_ROOT}--${size}`]: size
      },
      className
    );
    const stroke = (invert ? '#fff' : '#865CD6');
    return (
      <svg className={classes} viewBox='0 0 182 182'
        width='182' height='182'
        version='1.1' role='img' aria-label={Intl.getMessage(intl, a11yTitle)}>
        <path role='presentation' strokeWidth='18' stroke={stroke} fill='none'
          d='M 91,91 m 0,-82 a 82,82 0 1,1 0,164 a 82,82 0 1,1 0,-164' />
      </svg>
    );
  }
}

Grommet.contextTypes = {
  intl: PropTypes.object
};

Grommet.defaultProps = {
  a11yTitle: 'Grommet'
};

Grommet.propTypes = {
  a11yTitle: PropTypes.string,
  invert: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge'])
};
