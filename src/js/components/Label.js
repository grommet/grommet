// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import { announce } from '../utils/Announcer';

const CLASS_ROOT = CSSClassnames.LABEL;

export default class Label extends Component {

  componentDidUpdate () {
    if (this.props.announce) {
      announce(this.labelRef.textContent);
    }
  }

  render () {
    const {
      children, className, labelFor, margin, size, truncate, uppercase, ...props
    } = this.props;
    delete props.announce;
    let labelMargin = margin ? margin : ('small' === size ? 'none' : 'medium');
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--truncate`]: truncate,
        [`${CLASS_ROOT}--uppercase`]: uppercase,
        [`${CLASS_ROOT}--margin-${labelMargin}`]: labelMargin,
        [`${CLASS_ROOT}--${size}`]: size
      },
      className
    );

    return (
      <label ref={(ref) => this.labelRef = ref} {...props}
        className={classes} htmlFor={labelFor}>
        {children}
      </label>
    );
  }
};

Label.propTypes = {
  announce: PropTypes.bool,
  labelFor: PropTypes.string,
  margin: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: PropTypes.oneOf(['small', 'medium']),
  truncate: PropTypes.bool,
  uppercase: PropTypes.bool
};

Label.defaultProps = {
  size: 'medium'
};
