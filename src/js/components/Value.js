// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import { announce } from '../utils/Announcer';

const CLASS_ROOT = CSSClassnames.VALUE;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class Value extends Component {

  componentDidUpdate () {
    if (this.props.announce) {
      announce(this.valueRef.textContent);
    }
  }

  render () {
    const {
      active, align, className, colorIndex, icon, label, responsive,
      size, trendIcon, units, value, ...props
    } = this.props;
    delete props.announce;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--align-${align}`]: align,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${CLASS_ROOT}--interactive`]: props.onClick,
        [`${CLASS_ROOT}--active`]: active
      },
      className
    );

    let unitsSpan;
    if (units) {
      unitsSpan = (
        <span className={`${CLASS_ROOT}__units`}>
          {units}
        </span>
      );
    }

    let labelSpan;
    if (label) {
      labelSpan = (
        <span className={`${CLASS_ROOT}__label`}>
          {label}
        </span>
      );
    }

    return (
      <div ref={(ref) => this.valueRef = ref} {...props} className={classes}>
        <div className={`${CLASS_ROOT}__annotated`}>
          {icon}
          <span className={`${CLASS_ROOT}__value`}>
            {value}
          </span>
          {unitsSpan}
          {trendIcon}
        </div>
        {labelSpan}
      </div>
    );
  }

}

Value.propTypes = {
  active: PropTypes.bool,
  align: PropTypes.oneOf(['start', 'center', 'end']),
  announce: PropTypes.bool,
  colorIndex: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onClick: PropTypes.func,
  responsive: PropTypes.bool,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  trendIcon: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string,
    PropTypes.node]),
  units: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

Value.defaultProps = {
  align: 'center',
  announce: false
};
