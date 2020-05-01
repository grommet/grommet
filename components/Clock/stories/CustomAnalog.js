"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var analogClockTheme = {
  clock: {
    analog: {
      size: {
        medium: '200px'
      },
      hour: {
        width: '8px',
        shape: 'square',
        color: 'accent-1',
        size: '30px'
      },
      minute: {
        size: '12px',
        width: '6px',
        color: 'grey'
      },
      second: {
        width: '4px',
        color: 'brand',
        size: '5px'
      }
    }
  }
};

var CustomAnalog = function CustomAnalog() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: analogClockTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Clock, {
    type: "analog"
  })));
};

(0, _react2.storiesOf)('Clock', module).add('Custom Analog', function () {
  return /*#__PURE__*/_react["default"].createElement(CustomAnalog, null);
}, {
  chromatic: {
    disable: true
  }
});