"use strict";

exports.__esModule = true;
exports["default"] = exports.Fill = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var pinnedColumns = _data.columns.map(function (c) {
  return _extends({}, c);
});

pinnedColumns[0].pin = true;
var myTheme = (0, _utils.deepMerge)(_themes.grommet, {
  table: {
    footer: {
      background: {
        color: 'background-back'
      }
    }
  },
  dataTable: {
    pinned: {
      header: {
        background: {
          opacity: 'medium'
        },
        extend: "backdrop-filter: blur(8px);"
      },
      footer: {
        background: {
          color: 'light-2'
        }
      }
    }
  }
});

var Fill = function Fill() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: myTheme,
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
      pinned: {
        color: 'background-contrast'
      }
    }
  })));
};

exports.Fill = Fill;
Fill.storyName = 'Fill and pin';
var _default = {
  title: 'Visualizations/DataTable/Fill and pin'
};
exports["default"] = _default;