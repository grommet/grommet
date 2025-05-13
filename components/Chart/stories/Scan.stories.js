"use strict";

exports.__esModule = true;
exports["default"] = exports.Scan = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _calcs = require("../calcs");
var _data = require("./data");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var count = 30,
  max = 100,
  min = 0;
var ScanChart = function ScanChart() {
  var _useState = (0, _react.useState)(undefined),
    active = _useState[0],
    setActive = _useState[1];
  var data = (0, _react.useMemo)(function () {
    return (0, _data.generateData)(count, max, min);
  }, []);
  var values = data.map(function (d) {
    return [d.time, d.value];
  });
  var _useMemo = (0, _react.useMemo)(function () {
      return (0, _calcs.calcs)(values, {
        min: min,
        max: max
      });
    }, [values]),
    axis = _useMemo.axis,
    bounds = _useMemo.bounds,
    pad = _useMemo.pad,
    thickness = _useMemo.thickness;
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Keyboard, {
      onLeft: function onLeft() {
        return setActive(Math.max(0, active - 1));
      },
      onRight: function onRight() {
        return setActive(Math.min(data.length - 1, active + 1));
      },
      onEsc: function onEsc() {
        return setActive(undefined);
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      tabIndex: "0",
      direction: "row",
      margin: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "xxsmall"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      flex: true,
      justify: "between"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      border: "top",
      align: "end"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, axis[1][0]))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      border: "bottom",
      align: "end"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, axis[1][1])))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      height: "xxsmall",
      flex: false
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
      guidingChild: "first"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: {
        horizontal: pad
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
      type: "bar",
      overflow: true,
      bounds: bounds,
      values: values,
      thickness: thickness,
      size: {
        width: 'full',
        height: 'small'
      }
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      direction: "row",
      justify: "between"
    }, values.map(function (v, i) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        flex: false,
        key: v[0]
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
        fill: true,
        anchor: "center",
        interactiveChild: "first"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        fill: true,
        pad: pad,
        background: active === i ? {
          color: 'dark-5',
          opacity: 'medium'
        } : undefined,
        onMouseOver: function onMouseOver() {
          return setActive(i);
        },
        onMouseOut: function onMouseOut() {
          return setActive(undefined);
        },
        onFocus: function onFocus() {},
        onBlur: function onBlur() {}
      }), active === i && /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        animation: {
          type: 'fadeIn',
          duration: 100
        },
        width: "xsmall",
        pad: "small",
        round: "small",
        background: "dark-3"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        size: "large"
      }, data[active].value), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        className: "chromatic-ignore",
        size: "small"
      }, new Date(data[active].time).toLocaleDateString()))));
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      height: "xxsmall",
      direction: "row",
      justify: "between",
      align: "center"
    }, axis[0].map(function (t) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        className: "chromatic-ignore",
        key: t
      }, new Date(t).toLocaleDateString());
    })))))
    // </Grommet>
  );
};
var Scan = exports.Scan = function Scan() {
  return /*#__PURE__*/_react["default"].createElement(ScanChart, null);
};
Scan.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Visualizations/Chart/Scan'
};