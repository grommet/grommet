"use strict";

exports.__esModule = true;
exports["default"] = exports.Step = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _excluded = ["direction"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var SimpleRangeSelector = function SimpleRangeSelector(_ref) {
  var _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = (0, _react.useState)([12, 16]),
    range = _useState[0],
    setRange = _useState[1];
  var onChange = function onChange(values) {
    setRange(values);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: direction === 'vertical' ? 'column' : 'row',
      justify: "between"
    }, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(function (value) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        key: value,
        width: "xxsmall",
        height: "xxsmall",
        align: "center",
        pad: "small",
        border: false
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        style: {
          fontFamily: 'monospace'
        }
      }, value));
    })), /*#__PURE__*/_react["default"].createElement(_grommet.RangeSelector, _extends({
      direction: direction,
      min: 10,
      max: 20,
      size: "full",
      values: range,
      onChange: onChange
    }, rest))))
    // </Grommet>
  );
};

var Step = exports.Step = function Step() {
  return /*#__PURE__*/_react["default"].createElement(SimpleRangeSelector, {
    step: 2
  });
};
Step.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Input/RangeSelector/Step'
};