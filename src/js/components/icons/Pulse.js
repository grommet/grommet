// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Add from './base/Add';
import CSSClassnames from '../../utils/CSSClassnames';
import classnames from 'classnames';

const CLASS_ROOT = CSSClassnames.PULSE;

export default class Pulse extends Component {
  render () {
    const {className, icon, ...props} = this.props;
    const classes = classnames(CLASS_ROOT, className);

    return (
      <div {...props} className={classes}>
        <div className={`${CLASS_ROOT}__icon`}>
          {icon}
        </div>
        <div className={`${CLASS_ROOT}__icon-anim`} />
      </div>
    );
  }
}

Pulse.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node
};

Pulse.defaultProps = {
  icon: <Add />
};
