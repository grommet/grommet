// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Add from './base/Add';
import CSSClassnames from '../../utils/CSSClassnames';
import classnames from 'classnames';

const CLASS_ROOT = CSSClassnames.PULSE;

export default class Pulse extends Component {
  render () {
    const classes = (this.props.className)
      ? classnames(
          CLASS_ROOT,
          this.props.className
        )
      : CLASS_ROOT;

    return (
      <div className={classes}>
        <div className={`${CLASS_ROOT}__icon`}>
          <Add />
        </div>
        <div className={`${CLASS_ROOT}__icon-anim`}></div>
      </div>
    );
  }
}

Pulse.propTypes = {
  className: PropTypes.string
};
