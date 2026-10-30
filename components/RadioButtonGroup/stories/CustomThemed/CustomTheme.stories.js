"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomRadioButtonGroup = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _themes = require("grommet/themes");
var _utils = require("grommet/utils");
var _styledComponents = require("styled-components");
var _excluded = ["value"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  radioButtonGroup: {
    container: {
      gap: 'medium'
    }
  },
  radioButton: {
    border: {
      color: 'dark-5',
      width: '5px'
    },
    container: {
      extend: (0, _styledComponents.css)(["color:black;"])
    },
    hover: {
      border: {
        color: 'dark-2'
      }
    },
    size: '30px',
    // affects the size of the outer circle
    icon: {
      size: '15px' // affects the size of the inner circle
    },
    check: {
      radius: '20%'
    }
  }
});
var CustomRadioButtonGroup = exports.CustomRadioButtonGroup = function CustomRadioButtonGroup(_ref) {
  var initialValue = _ref.value,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = (0, _react.useState)(initialValue),
    value = _useState[0],
    setValue = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.ThemeContext.Consumer, null, function (theme) {
    return console.log(JSON.stringify(theme.radioButton));
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, _extends({
    name: "radio",
    options: [{
      label: 'Choice 1',
      value: 'c1'
    }, {
      label: 'Choice 2',
      value: 'c2'
    }, {
      label: 'Choice 3',
      value: 'c3'
    }],
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }, props))));
};
CustomRadioButtonGroup.storyName = 'Custom theme';
var _default = exports["default"] = {
  title: 'Input/RadioButtonGroup/Custom Themed/Custom theme'
};