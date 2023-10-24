"use strict";

exports.__esModule = true;
exports["default"] = exports.ThemeRadioButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _themes = require("grommet/themes");
var _utils = require("grommet/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var theme = (0, _utils.deepMerge)(_themes.grommet, {
  radioButton: {
    gap: 'xsmall',
    size: '25px',
    hover: {
      border: {
        color: 'neutral-4'
      }
    },
    check: {
      color: {
        light: 'neutral-4'
      },
      background: {
        color: 'light-1'
      }
    },
    icon: {
      size: '20px'
    },
    font: {
      weight: 500
    }
  }
});
var ThemeRadioButton = exports.ThemeRadioButton = function ThemeRadioButton() {
  var _React$useState = _react["default"].useState(),
    selected = _React$useState[0],
    setSelected = _React$useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: theme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButton, {
    label: "option 1",
    name: "name",
    value: "option 1",
    checked: selected === 'option 1',
    onChange: function onChange(event) {
      return setSelected(event.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "clear",
    onClick: function onClick() {
      return setSelected(undefined);
    }
  })));
};
ThemeRadioButton.storyName = 'Theme';
var _default = exports["default"] = {
  title: 'Input/RadioButton/Custom Themed/Theme'
};