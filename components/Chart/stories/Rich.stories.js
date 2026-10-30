"use strict";

exports.__esModule = true;
exports["default"] = exports.Rich = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _calcs2 = require("../calcs");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var Rich = exports.Rich = function Rich() {
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
    }

    // convert for displaying
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
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
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
    }))))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Chart/Rich'
};