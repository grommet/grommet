// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import PropTypes from 'prop-types';
import { baseUnit } from '../../utils/Graphics';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.METER;

export var baseDimension = baseUnit * 8;

export var propTypes = {
  activeIndex: PropTypes.number,
  a11yTitle: PropTypes.string,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onActivate: PropTypes.func,
  series: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string,
    onClick: PropTypes.func
  })).isRequired,
  total: PropTypes.number
};

export function buildPath (itemIndex, commands, classes, onActivate,
    onClick, a11yTitle, role) {
  if (onActivate) {
    const onOver = onActivate.bind(null, itemIndex);
    const onOut = onActivate.bind(null, undefined);

    let a11yRoles = {};
    if (a11yTitle) {
      a11yRoles['aria-label'] = a11yTitle;
      a11yRoles.role = role;
    }

    return (
      <g key={itemIndex} {...a11yRoles}>
        <path className={classes} d={commands}
          data-index={itemIndex} onFocus={onOver} onBlur={onOut} />
        <path className={`${CLASS_ROOT}__hot`} d={commands} fill="none"
          onMouseOver={onOver} onMouseOut={onOut}
          onClick={onClick} />
      </g>
    );
  } else {
    return (
      <path key={itemIndex} className={classes} d={commands} />
    );
  }
}
