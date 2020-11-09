"use strict";

exports.__esModule = true;
exports.Rich = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _calcs2 = require("../calcs");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Rich = function Rich() {
  var _useState = (0, _react.useState)({
    values: [],
    yAxis: [],
    xAxis: []
  }),
      state = _useState[0],
      setState = _useState[1];

  (0, _react.useEffect)(function () {
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

    var _calcs = (0, _calcs2.calcs)(values, {
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
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "between",
    width: "medium",
    margin: {
      vertical: 'small'
    }
  }, xAxis.map(function (x) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      key: x
    }, x);
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
    guidingChild: "last"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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

    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: y,
      direction: "row",
      align: align
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: {
        horizontal: 'small'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, y)), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      border: "top",
      flex: true
    }));
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Chart, _extends({}, chartProps, {
    type: "area",
    color: {
      color: 'accent-1',
      opacity: 'medium'
    },
    thickness: "hair"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Chart, _extends({}, chartProps, {
    type: "line",
    round: true,
    color: {
      color: 'accent-3',
      opacity: 'strong'
    },
    thickness: "small"
  })))));
};

exports.Rich = Rich;