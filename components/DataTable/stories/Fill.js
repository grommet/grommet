"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var pinnedColumns = _data.columns.map(function (c) {
  return _extends({}, c);
});

pinnedColumns[0].pin = true;

var Example = function Example() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: "vertical"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: pinnedColumns,
    data: _data.data,
    step: 10,
    fill: true,
    pin: true,
    background: {
      header: {
        color: 'background-front',
        opacity: 'strong'
      },
      footer: {
        color: 'background-front',
        opacity: 'strong'
      },
      pinned: {
        color: 'background-front',
        opacity: 'strong'
      }
    }
  })));
};

(0, _react2.storiesOf)('DataTable', module).add('Fill and pin', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
});