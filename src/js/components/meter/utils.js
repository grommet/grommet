// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';

function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

module.exports = {

  baseUnit: 24,
  baseDimension: 192, // 24 * 8

  classRoot: 'meter',

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

  buildPath (itemIndex, commands, classes, onActivate, onClick, a11yDescId, a11yTitle) {
    if (onActivate) {
      var onOver = onActivate.bind(null, itemIndex);
      var onOut = onActivate.bind(null, null);

      let pathTitleId = `title_${a11yDescId}`;

      return (
        <g key={itemIndex} id={a11yDescId} ref={a11yDescId}
          role="gridcell" aria-labelledby={pathTitleId}>
          <title id={pathTitleId}>
            {a11yTitle}
          </title>
          <path className={classes.join(' ')} d={commands}
            onFocus={onOver} onBlur={onOut}
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
