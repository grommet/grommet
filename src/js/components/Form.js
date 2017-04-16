// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.FORM;

export default class Form extends Component {
  render () {
    const { className, compact, fill, pad, plain, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--compact`]: compact,
        [`${CLASS_ROOT}--fill`]: fill,
        [`${CLASS_ROOT}--pad-${pad}`]: typeof pad === 'string',
        [`${CLASS_ROOT}--pad-horizontal-${pad.horizontal}`]:
          typeof pad === 'object' && 'horizontal' in pad,
        [`${CLASS_ROOT}--pad-vertical-${pad.vertical}`]:
          typeof pad === 'object' && 'vertical' in pad,
        [`${CLASS_ROOT}--plain`]: plain
      },
      className
    );

    return (
      <form {...props} className={classes} onSubmit={this.props.onSubmit}>
        {this.props.children}
      </form>
    );
  }
}

Form.propTypes = {
  compact: PropTypes.bool,
  fill: PropTypes.bool,
  onSubmit: PropTypes.func,
  pad: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    PropTypes.shape({
      horizontal: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
      vertical: PropTypes.oneOf(['none', 'small', 'medium', 'large'])
    })
  ]),
  plain: PropTypes.bool
};

Form.defaultProps = {
  compact: false,
  fill: false,
  pad: 'none'
};
