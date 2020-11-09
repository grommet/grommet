function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useState } from 'react';
import { Grommet, Box, Chart, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { calcs } from '../calcs';
export var Rich = function Rich() {
  var _useState = useState({
    values: [],
    yAxis: [],
    xAxis: []
  }),
      state = _useState[0],
      setState = _useState[1];

  useEffect(function () {
    // generate data as a server might
    var date = new Date(2018, 5, 9);
    var value = 12345.678;
    var averages = [];

    while (averages.length < 21) {
      averages.unshift({
        date: date.toISOString(),
        value: value
      });
      date.setTime(date.getTime() - 1000 * 3600 * 24);
      var factor = date.getDate() % 3;
      value = factor === 0 ? value + 12.34 : value - 123.45 * factor;
    } // convert for displaying


    var values = averages.map(function (avg) {
      return {
        value: [new Date(avg.date).getTime(), avg.value]
      };
    });

    var _calcs = calcs(values, {
      coarseness: 5,
      steps: [3, 3]
    }),
        axis = _calcs.axis,
        bounds = _calcs.bounds;

    var xAxis = axis[0].map(function (x) {
      return new Date(x).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    });
    var yAxis = axis[1];
    setState({
      bounds: bounds,
      values: values,
      yAxis: yAxis,
      xAxis: xAxis
    });
  }, []);
  var bounds = state.bounds,
      values = state.values,
      yAxis = state.yAxis,
      xAxis = state.xAxis;
  var chartProps = {
    size: {
      width: 'medium',
      height: 'small'
    },
    bounds: bounds,
    values: values,
    overflow: true
  };
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    justify: "between",
    width: "medium",
    margin: {
      vertical: 'small'
    }
  }, xAxis.map(function (x) {
    return /*#__PURE__*/React.createElement(Text, {
      key: x
    }, x);
  })), /*#__PURE__*/React.createElement(Stack, {
    guidingChild: "last"
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    justify: "between"
  }, yAxis.map(function (y, index) {
    var first = index === 0;
    var last = index === yAxis.length - 1 && !first;
    var align;

    if (first) {
      align = 'start';
    } else if (last) {
      align = 'end';
    } else {
      align = 'center';
    }

    return /*#__PURE__*/React.createElement(Box, {
      key: y,
      direction: "row",
      align: align
    }, /*#__PURE__*/React.createElement(Box, {
      pad: {
        horizontal: 'small'
      }
    }, /*#__PURE__*/React.createElement(Text, null, y)), /*#__PURE__*/React.createElement(Box, {
      border: "top",
      flex: true
    }));
  })), /*#__PURE__*/React.createElement(Chart, _extends({}, chartProps, {
    type: "area",
    color: {
      color: 'accent-1',
      opacity: 'medium'
    },
    thickness: "hair"
  })), /*#__PURE__*/React.createElement(Chart, _extends({}, chartProps, {
    type: "line",
    round: true,
    color: {
      color: 'accent-3',
      opacity: 'strong'
    },
    thickness: "small"
  })))));
};