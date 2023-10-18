"use strict";

exports.__esModule = true;
exports["default"] = exports.Window = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _calcs = require("../calcs");
var _data = require("./data");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
// compress data for outer control chart
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
  var _useState = (0, _react.useState)(),
    hover = _useState[0],
    setHover = _useState[1];
  var _useState2 = (0, _react.useState)([data.length / 2, data.length / 2 + data.length * 0.05]),
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
  var outerValues = (0, _react.useMemo)(function () {
    return compressData(data, max, 101);
  }, [data, max]);
  var _useMemo = (0, _react.useMemo)(function () {
      return (0, _calcs.calcs)(outerValues, {
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
  var _useMemo2 = (0, _react.useMemo)(function () {
      return (0, _calcs.calcs)(innerValues, {
        min: 0,
        max: max
      });
    }, [innerValues, max]),
    innerAxis = _useMemo2.axis,
    innerBounds = _useMemo2.bounds,
    thickness = _useMemo2.thickness;
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      justify: "between",
      className: "chromatic-ignore"
    }, innerAxis[0].reverse().map(function (t) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        key: t
      }, new Date(t).toLocaleDateString());
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
      guidingChild: "first",
      interactiveChild: "first"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: {
        horizontal: thickness
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
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
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      justify: "between"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      border: {
        side: 'top'
      },
      align: "start"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, innerAxis[1][0]))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      border: {
        side: 'bottom',
        color: 'accent-2',
        size: 'medium'
      },
      align: "start"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, innerAxis[1][1])))), hover && /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "large",
      weight: "bold"
    }, hover.value[1]), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, new Date(hover.value[0]).toLocaleDateString())))), /*#__PURE__*/_react["default"].createElement(_grommet.Stack, null, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
      type: "line",
      bounds: outerBounds,
      values: outerValues,
      size: {
        width: 'full',
        height: 'xxsmall'
      },
      thickness: "xxsmall"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.RangeSelector, {
      min: 0,
      max: data.length,
      size: "full",
      values: range,
      onChange: onChange,
      color: "accent-2",
      style: {
        userSelect: 'none'
      }
    })))
    // </Grommet>
  );
};

var Window = exports.Window = function Window() {
  return /*#__PURE__*/_react["default"].createElement(WindowChart, {
    data: (0, _data.generateData)(1000, 100),
    max: 100
  });
};
var _default = exports["default"] = {
  title: 'Visualizations/Chart/Window'
};