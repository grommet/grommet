// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.FORM_FIELDS;

export default class FormFields extends Component {
  render () {
    const { children, className, ...props } = this.props;
    let classes = classnames(CLASS_ROOT, className);

    return (
      <div {...props} className={classes}>
        {children}
      </div>
    );
  }
};
