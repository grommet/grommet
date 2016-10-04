// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.HEADING;

export default class Heading extends Component {
  render() {
    const {
      align, children, className, margin, size, strong, tag: Tag, uppercase,
      ...props
    } = this.props;
    const classes = classnames(
      CLASS_ROOT, {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--strong`]: strong,
        [`${CLASS_ROOT}--align-${align}`]: align,
        [`${CLASS_ROOT}--margin-${margin}`]: margin,
        [`${CLASS_ROOT}--uppercase`]: uppercase
      },
      className
    );

    return (
      <Tag {...props} className={classes}>
        {children}
      </Tag>
    );
  }
}

Heading.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  margin: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  strong: PropTypes.bool,
  tag: PropTypes.string,
  uppercase: PropTypes.bool
};

Heading.defaultProps = {
  tag: 'h1'
};
