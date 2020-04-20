"use strict";

var _react = _interopRequireDefault(require("react"));

var _styledComponents = require("styled-components");

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  tab: {
    color: 'text',
    active: {
      background: 'background-back'
    },
    hover: {
      background: 'background-back',
      color: 'control'
    },
    border: {
      side: 'bottom',
      color: 'background-back',
      active: {
        color: 'border'
      },
      hover: {
        color: 'control'
      }
    },
    pad: 'small',
    margin: 'none',
    extend: function extend(_ref) {
      var theme = _ref.theme;
      return (0, _styledComponents.css)(["border-top-left-radius:", ";border-top-right-radius:", ";font-weight:bold;"], theme.global.control.border.radius, theme.global.control.border.radius);
    }
  }
});

var Icon = function Icon() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: customTheme,
    full: true
  }, _react["default"].createElement(_grommet.Box, {
    pad: "medium",
    fill: true
  }, _react["default"].createElement(_grommet.Tabs, {
    flex: true
  }, _react["default"].createElement(_grommet.Tab, {
    title: "Tab 1",
    icon: _react["default"].createElement(_grommetIcons.Attraction, null)
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-1"
  }, _react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 2",
    icon: _react["default"].createElement(_grommetIcons.TreeOption, null)
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-2"
  }, _react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 3",
    icon: _react["default"].createElement(_grommetIcons.Car, null)
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-3"
  }, _react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  }))))));
};

(0, _react2.storiesOf)('Tabs', module).add('Icon', function () {
  return _react["default"].createElement(Icon, null);
});