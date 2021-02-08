function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo, useState } from 'react';
import { Grommet, Box, Chart, RangeSelector, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { calcs } from '../calcs';
import { generateData } from './data'; // compress data for outer control chart

var compressData = function compressData(data, max, count) {
  var result = [];
  var bucketSize = Math.round(data.length / count);
  var bucket = [];
  var bucketMin = max;
  var bucketMax = 0;
  var date = 0;
  data.forEach(function (d) {
    if (bucket.length >= bucketSize) {
      result.push({
        value: [date, bucketMin, bucketMax]
      });
      bucket = [];
      bucketMin = 100;
      bucketMax = 0;
      date = 0;
    }

    date = Math.max(date, d.time);
    bucketMin = Math.min(bucketMin, d.value);
    bucketMax = Math.max(bucketMax, d.value);
    bucket.push(d);
  });

  if (bucket.length) {
    result.push({
      value: [date, bucketMin, bucketMax]
    });
  }

  return result;
};

var WindowChart = function WindowChart(_ref) {
  var data = _ref.data,
      max = _ref.max;

  var _useState = useState(),
      hover = _useState[0],
      setHover = _useState[1];

  var _useState2 = useState([data.length / 2, data.length / 2 + data.length * 0.05]),
      range = _useState2[0],
      setRange = _useState2[1];

  var onChange = function onChange(newRange) {
    return setRange(newRange);
  };

  var onHover = function onHover(value) {
    return function (over) {
      setHover(over ? value : undefined);
    };
  };

  var outerValues = useMemo(function () {
    return compressData(data, max, 101);
  }, [data, max]);

  var _useMemo = useMemo(function () {
    return calcs(outerValues, {
      min: 0,
      max: max
    });
  }, [outerValues, max]),
      outerBounds = _useMemo.bounds;

  var innerValues = data.slice(range[0], range[1]).map(function (d) {
    return {
      value: [d.time, d.value]
    };
  });

  var _useMemo2 = useMemo(function () {
    return calcs(innerValues, {
      min: 0,
      max: max
    });
  }, [innerValues, max]),
      innerAxis = _useMemo2.axis,
      innerBounds = _useMemo2.bounds,
      thickness = _useMemo2.thickness;

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    justify: "between",
    className: "chromatic-ignore"
  }, innerAxis[0].reverse().map(function (t) {
    return /*#__PURE__*/React.createElement(Text, {
      key: t
    }, new Date(t).toLocaleDateString());
  })), /*#__PURE__*/React.createElement(Stack, {
    guidingChild: "first",
    interactiveChild: "first"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: thickness
    }
  }, /*#__PURE__*/React.createElement(Chart, {
    type: "bar",
    color: "accent-2",
    overflow: true,
    bounds: innerBounds,
    values: innerValues.map(function (v) {
      return _extends({}, v, {
        onHover: onHover(v)
      });
    }),
    thickness: thickness,
    size: {
      width: 'full',
      height: 'small'
    }
  })), /*#__PURE__*/React.createElement(Box, {
    fill: true,
    justify: "between"
  }, /*#__PURE__*/React.createElement(Box, {
    border: {
      side: 'top'
    },
    align: "start"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "xsmall",
    background: {
      color: 'white',
      opacity: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Text, null, innerAxis[1][0]))), /*#__PURE__*/React.createElement(Box, {
    border: {
      side: 'bottom',
      color: 'accent-2',
      size: 'medium'
    },
    align: "start"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "xsmall",
    background: {
      color: 'white',
      opacity: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Text, null, innerAxis[1][1])))), hover && /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    animation: {
      type: 'fadeIn',
      duration: 100
    },
    pad: "medium",
    background: {
      color: 'white',
      opacity: 'strong'
    },
    border: {
      color: 'accent-2'
    },
    round: true,
    className: "chromatic-ignore"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "large",
    weight: "bold"
  }, hover.value[1]), /*#__PURE__*/React.createElement(Text, null, new Date(hover.value[0]).toLocaleDateString())))), /*#__PURE__*/React.createElement(Stack, null, /*#__PURE__*/React.createElement(Chart, {
    type: "line",
    bounds: outerBounds,
    values: outerValues,
    size: {
      width: 'full',
      height: 'xxsmall'
    },
    thickness: "xxsmall"
  }), /*#__PURE__*/React.createElement(RangeSelector, {
    min: 0,
    max: data.length,
    size: "full",
    values: range,
    onChange: onChange,
    color: "accent-2",
    style: {
      userSelect: 'none'
    }
  }))));
};

export var Window = function Window() {
  return /*#__PURE__*/React.createElement(WindowChart, {
    data: generateData(1000, 100),
    max: 100
  });
};
export default {
  title: 'Visualizations/Chart/Window'
};