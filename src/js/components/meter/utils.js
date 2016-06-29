// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import CSSClassnames from '../../utils/CSSClassnames';

const METER = CSSClassnames.METER;

function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

export default {

  baseUnit: 24,
  baseDimension: 192, // 24 * 8

  classRoot: METER,

  propTypes: {
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
    total: PropTypes.number.isRequired,
    units: PropTypes.string
  },

  polarToCartesian: polarToCartesian,

  arcCommands: function (centerX, centerY, radius, startAngle, endAngle) {
    // handle that we can't draw a complete circle
    if (endAngle - startAngle >= 360) {
      endAngle = startAngle + 359.99;
    }
    var start = polarToCartesian(centerX, centerY, radius, endAngle);
    var end = polarToCartesian(centerX, centerY, radius, startAngle);
    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, arcSweep, 0, end.x, end.y
    ].join(" ");
    return d;
  },

  translateEndAngle: function (startAngle, anglePer, value) {
    return Math.min(360, Math.max(0, startAngle + (anglePer * value)));
  },

  buildPath (itemIndex, commands, classes, onActivate,
    onClick, a11yDescId, a11yTitle, activeMeterSlice) {
    if (onActivate) {
      var onOver = onActivate.bind(null, itemIndex);
      var onOut = onActivate.bind(null, null);

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
            onFocus={onOver} onBlur={onOut} data-index={itemIndex}
            onMouseOver={onOver} onMouseOut={onOut}
            onClick={onClick} />
        </g>
      );
    } else {
      return (
        <path key={itemIndex} className={classes.join(' ')} d={commands} />
      );
    }
  }

};
