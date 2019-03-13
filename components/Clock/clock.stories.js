"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomThemeAnalogClock = {
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

var DigitalClock = function DigitalClock() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, _react.default.createElement(_grommet.Clock, {
    type: "digital"
  })));
};

var AnalogClock = function AnalogClock() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, _react.default.createElement(_grommet.Clock, {
    type: "analog"
  })));
};

var CustomAnalogClock = function CustomAnalogClock() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: CustomThemeAnalogClock
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, _react.default.createElement(_grommet.Clock, {
    type: "analog"
  })));
};

(0, _react2.storiesOf)('Clock', module).add('Digital', function () {
  return _react.default.createElement(DigitalClock, null);
}).add('Analog', function () {
  return _react.default.createElement(AnalogClock, null);
}).add('Custom Analog', function () {
  return _react.default.createElement(CustomAnalogClock, null);
});