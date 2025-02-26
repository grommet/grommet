"use strict";

exports.__esModule = true;
exports["default"] = exports.Fill = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _themes = require("grommet/themes");
var _utils = require("grommet/utils");
var _data = require("../data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
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
var Fill = exports.Fill = function Fill() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: myTheme,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: "vertical"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    tabIndex: 0,
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
Fill.storyName = 'Fill and pin';
var _default = exports["default"] = {
  title: 'Visualizations/DataTable/Custom Themed/Fill and pin'
};