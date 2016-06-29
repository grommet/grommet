// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.LABEL;

export default class Label extends Component {
  render () {
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--uppercase`]: this.props.uppercase,
        [`${CLASS_ROOT}--margin-${this.props.margin}`]: this.props.margin
      }
    );

    return (
      <label className={classes} htmlFor={this.props.labelFor}>
        {this.props.children}
      </label>
    );
  }
};

Label.propTypes = {
  labelFor: PropTypes.string,
  margin: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  uppercase: PropTypes.bool
};

Label.defaultProps = {
  margin: 'medium'
};
