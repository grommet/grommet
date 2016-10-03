// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.LABEL;

export default class Label extends Component {
  render () {
    const {
      children, className, labelFor, margin, size, uppercase, ...props
    } = this.props;
    let labelMargin = margin ? margin : ('small' === size ? 'none' : 'medium');
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--uppercase`]: uppercase,
        [`${CLASS_ROOT}--margin-${labelMargin}`]: labelMargin,
        [`${CLASS_ROOT}--${size}`]: size
      },
      className
    );

    return (
      <label {...props} className={classes} htmlFor={labelFor}>
        {children}
      </label>
    );
  }
};

Label.propTypes = {
  labelFor: PropTypes.string,
  margin: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: PropTypes.oneOf(['small', 'medium']),
  uppercase: PropTypes.bool
};

Label.defaultProps = {
  size: 'medium'
};
