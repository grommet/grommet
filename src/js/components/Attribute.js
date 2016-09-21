// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.ATTRIBUTE;

export default class Attribute extends Component {
  render () {
    return (
      <div className={CLASS_ROOT}>
        <label className={`${CLASS_ROOT}__label`}>
          {this.props.label}
        </label>
        <span className={`${CLASS_ROOT}__contents`}>
          {this.props.children}
        </span>
      </div>
    );
  }
};

Attribute.propTypes = { // remove in 1.0
  label: PropTypes.string
};
