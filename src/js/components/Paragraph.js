// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.PARAGRAPH;

export default class Paragraph extends Component {
  render () {
    const {
      align, children, className, margin, size, width, ...props
    } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--align-${align}`]: align,
        [`${CLASS_ROOT}--margin-${margin}`]: margin,
        [`${CLASS_ROOT}--width-${width}`]: width
      },
      className
    );

    return (
      <p {...props} className={classes}>
        {children}
      </p>
    );
  }
};

Paragraph.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  margin: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  width: PropTypes.oneOf(['small', 'medium', 'large'])
};
