"use strict";

exports.__esModule = true;
exports.GlobalThemeWithThemeContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

var _grommet = require("grommet");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  global: {
    focus: {
      border: {
        color: 'red'
      },
      shadow: {
        color: 'red'
      }
    }
  }
});

var GlobalThemeWithThemeContext = function GlobalThemeWithThemeContext() {
  var options = ['one', 'two', 'three'];

  var _useState = (0, _react.useState)(''),
      valueRed = _useState[0],
      setValueRed = _useState[1];

  var _useState2 = (0, _react.useState)(''),
      valueBlue = _useState2[0],
      setValueBlue = _useState2[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    direction: "column",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: "medium"
  }, "The focus color of this select component is being altered by the custom theme that is passed into the Grommet component."), /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    alignSelf: "center",
    placeholder: "Select",
    value: valueRed,
    options: options,
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setValueRed(option);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.ThemeContext.Extend, {
    value: {
      global: {
        focus: {
          border: {
            color: 'blue'
          }
        }
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: "medium"
  }, "The focus color of this select component is being altered by ThemeContext, independent from the custom theme"), /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    alignSelf: "center",
    placeholder: "Select",
    value: valueBlue,
    options: options,
    onChange: function onChange(_ref2) {
      var option = _ref2.option;
      return setValueBlue(option);
    }
  })))));
};

exports.GlobalThemeWithThemeContext = GlobalThemeWithThemeContext;
GlobalThemeWithThemeContext.story = {
  name: 'ThemeContext.Extend'
};