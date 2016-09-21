// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import classnames from 'classnames';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.BRICKS;

export default class Bricks extends Component {
  render () {
    console.warn(
      'Bricks: component has been deprecated. Use Box instead.'
    );
    let classes = classnames(CLASS_ROOT, this.props.className);

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
};

// remove in 1.0, use Box

Bricks.displayName = 'Bricks';
