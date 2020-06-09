"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var myTheme = (0, _utils.deepMerge)(_grommet.grommet, {
  tabs: {
    header: {
      border: {
        side: 'bottom',
        color: 'blue',
        size: 'small'
      }
    }
  },
  tab: {
    border: {
      side: 'bottom',
      color: 'dark-4'
    },
    pad: 'small',
    margin: {
      // bring the overall tabs border behind invidual tab borders
      vertical: '-2px',
      horizontal: 'none'
    }
  }
});

var AlignControls = function AlignControls() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: myTheme,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tabs, {
    justify: "start",
    alignControls: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 1"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    pad: "large",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 2"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    pad: "large",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 3"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    pad: "large",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  })))));
};

(0, _react2.storiesOf)('Tabs', module).add('Align Controls', function () {
  return /*#__PURE__*/_react["default"].createElement(AlignControls, null);
});