"use strict";

exports.__esModule = true;
exports["default"] = exports.Bounds = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var rangeInputTheme = {
  rangeInput: {
    track: {
      height: '10px',
      lower: {
        color: 'brand',
        opacity: 0.7
      },
      upper: {
        color: 'dark-4',
        opacity: 0.3
      }
    }
  }
};
var Bounds = exports.Bounds = function Bounds() {
  var _React$useState = _react["default"].useState(0),
    value = _React$useState[0],
    setValue = _React$useState[1];
  var _React$useState2 = _react["default"].useState(),
    isAddDisabled = _React$useState2[0],
    setIsAddDisabled = _React$useState2[1];
  var _React$useState3 = _react["default"].useState(),
    isSubtractDisabled = _React$useState3[0],
    setIsSubtractDisabled = _React$useState3[1];
  (0, _react.useEffect)(function () {
    setIsSubtractDisabled(value <= -5);
    setIsAddDisabled(value >= 5);
  }, [value]);
  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: rangeInputTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    pad: "large",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    plain: false,
    disabled: isSubtractDisabled,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Subtract, {
      color: "neutral-2"
    }),
    onClick: function onClick() {
      return setValue(function (prev) {
        return prev - 1;
      });
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RangeInput, {
    a11yTitle: "Select range value",
    min: -5,
    max: 5,
    step: 1,
    value: value,
    onChange: onChange
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    plain: false,
    disabled: isAddDisabled,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, {
      color: "neutral-2"
    }),
    onClick: function onClick() {
      return setValue(function (prev) {
        return prev + 1;
      });
    }
  })));
};
var _default = exports["default"] = {
  title: 'Input/RangeInput/Custom Themed/Bounds'
};