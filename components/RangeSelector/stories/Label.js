"use strict";

exports.__esModule = true;
exports["default"] = exports.Label = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _RangeSelector = require("../RangeSelector");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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