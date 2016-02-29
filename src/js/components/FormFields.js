// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import classnames from 'classnames';

const CLASS_ROOT = 'form-fields';

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
