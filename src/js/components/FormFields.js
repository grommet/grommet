// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.FORM_FIELDS;

export default class FormFields extends Component {
  render () {
    let classes = classnames(CLASS_ROOT, this.props.className);

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
};
