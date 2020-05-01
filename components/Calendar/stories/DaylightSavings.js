"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// DSTCalendar has dates specifically chosen to identify issues with
// crossing the daylight savings time boundary (from California).
var DSTCalendar = function DSTCalendar() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    direction: "row",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    border: "right"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "xlarge"
  }, "Daylight MST"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: {
      vertical: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    date: "2018-11-04T06:00:00.000Z",
    bounds: ['2013-11-06', '2018-12-06']
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: {
      vertical: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    date: "2019-03-11T05:00:01.409Z",
    bounds: ['2019-03-01', '2019-03-31']
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "xlarge"
  }, "Daylight PST"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: {
      vertical: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    date: "2018-11-04T07:00:00.000Z",
    bounds: ['2013-11-06', '2018-12-06']
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: {
      vertical: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    date: "2019-03-15T06:00:01.409Z",
    bounds: ['2019-03-01', '2019-03-31']
  })))));
};

(0, _react2.storiesOf)('Calendar', module).add('Daylight Savings Time', function () {
  return /*#__PURE__*/_react["default"].createElement(DSTCalendar, null);
});