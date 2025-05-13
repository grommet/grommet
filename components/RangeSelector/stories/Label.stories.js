"use strict";

exports.__esModule = true;
exports["default"] = exports.Label = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _RangeSelector = require("../RangeSelector");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var Label = exports.Label = function Label() {
  var _useState = (0, _react.useState)([0, 100]),
    range = _useState[0],
    setRange = _useState[1];
  var _useState2 = (0, _react.useState)([0, 100]),
    range2 = _useState2[0],
    setRange2 = _useState2[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "xlarge",
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      name: "range",
      htmlFor: "range",
      label: "Range"
    }, /*#__PURE__*/_react["default"].createElement(_RangeSelector.RangeSelector, {
      id: "range",
      min: 0,
      max: 100,
      label: true,
      values: range,
      onChange: function onChange(nextRange) {
        setRange(nextRange);
      }
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      name: "range2",
      htmlFor: "range2",
      label: "Range units"
    }, /*#__PURE__*/_react["default"].createElement(_RangeSelector.RangeSelector, {
      id: "range2",
      min: 0,
      max: 100,
      label: function label(value) {
        return value + "%";
      },
      values: range2,
      onChange: function onChange(nextRange) {
        setRange2(nextRange);
      }
    }))))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Input/RangeSelector/Label'
};