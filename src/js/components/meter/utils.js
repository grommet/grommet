// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import { baseUnit } from '../../utils/Graphics';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.METER;

export var baseDimension = baseUnit * 8;

export var propTypes = {
  activeIndex: PropTypes.number,
  a11yDesc: PropTypes.string,
  a11yDescId: PropTypes.string,
  a11yTitle: PropTypes.string,
  a11yTitleId: PropTypes.string,
  max: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string
  }).isRequired,
  min: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string
  }).isRequired,
  onActivate: PropTypes.func.isRequired,
  // size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  series: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string,
    important: PropTypes.bool,
    onClick: PropTypes.func
  })).isRequired,
  total: PropTypes.number,
  units: PropTypes.string
};

export function buildPath (itemIndex, commands, classes, onActivate,
    onClick, a11yDescId, a11yTitle, activeMeterSlice) {
  if (onActivate) {
    const onOver = onActivate.bind(null, itemIndex);
    const onOut = onActivate.bind(null, undefined);

    let a11yRoles = {};
    let titleComponent;
    let activeSlice;
    if (a11yTitle && a11yDescId) {
      activeSlice = activeMeterSlice;
      let pathTitleId = `title_${a11yDescId}`;
      a11yRoles['aria-labelledby'] = pathTitleId;
      a11yRoles.id = a11yDescId;
      a11yRoles.role = 'tab';
      titleComponent = (
        <title id={pathTitleId}>
          {a11yTitle}
        </title>
      );
    }

    return (
      <g key={itemIndex} ref={a11yDescId} {...a11yRoles}>
        {titleComponent}
        <path ref={activeSlice} className={classes.join(' ')} d={commands}
          data-index={itemIndex} onFocus={onOver} onBlur={onOut} />
        <path className={`${CLASS_ROOT}__hot`} d={commands} fill="none"
          onMouseOver={onOver} onMouseOut={onOut}
          onClick={onClick} />
      </g>
    );
  } else {
    return (
      <path key={itemIndex} className={classes.join(' ')} d={commands} />
    );
  }
};
