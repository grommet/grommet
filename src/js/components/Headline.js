// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.HEADLINE;

export default class Headline extends Component {
  render () {
    const {
      align, children, className, margin, size, strong, ...props
    } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--align-${align}`]: align,
        [`${CLASS_ROOT}--margin-${margin}`]: margin,
        [`${CLASS_ROOT}--strong`]: strong
      },
      className
    );

    return (
      <div {...props} className={classes}>
        {children}
      </div>
    );
  }
};

Headline.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  margin: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  strong: PropTypes.bool
};
