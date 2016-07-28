// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Props from '../utils/Props';

const CLASS_ROOT = CSSClassnames.LABEL;

export default class Label extends Component {
  render () {
    let { margin, size } = this.props;
    margin = margin ? margin : ('small' === size ? 'none' : 'medium');
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--uppercase`]: this.props.uppercase,
        [`${CLASS_ROOT}--margin-${margin}`]: margin,
        [`${CLASS_ROOT}--${size}`]: size
      }
    );
    const restProps = Props.omit(this.props, Object.keys(Label.propTypes));

    return (
      <label {...restProps} className={classes} htmlFor={this.props.labelFor}>
        {this.props.children}
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
