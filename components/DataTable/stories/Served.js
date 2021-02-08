"use strict";

exports.__esModule = true;
exports["default"] = exports.ServedDataTable = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ServedDataTable = function ServedDataTable() {
  var _React$useState = _react["default"].useState(_data.DATA),
      data2 = _React$useState[0],
      setData2 = _React$useState[1];

  var onSearch = function onSearch(search) {
    var nextData;

    if (search) {
      // The function below escapes regular expression special characters:
      // [ \ ^ $ . | ? * + ( )
      var escapedText = function escapedText(text) {
        text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
        return new RegExp(escapedText, 'i');
      };

      var expressions = Object.keys(search).map(function (property) {
        return {
          property: property,
          // Create the regular expression with modified value which handles
          // escaping special characters. Without escaping special characters,
          // errors will appear in the console
          exp: new RegExp(escapedText(search[property]), 'i')
        };
      });
      nextData = _data.DATA.filter(function (d) {
        return !expressions.some(function (e) {
          return !e.exp.test(d[e.property]);
        });
      });
    } else {
      nextData = _data.DATA;
    }

    setData2(nextData);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: _data.columns.map(function (column) {
      return _extends({}, column, {
        search: column.property === 'name' || column.property === 'location'
      });
    }),
    data: data2,
    onSearch: onSearch
  })));
};

exports.ServedDataTable = ServedDataTable;
ServedDataTable.storyName = 'Served';
var _default = {
  title: 'Visualizations/DataTable/Served'
};
exports["default"] = _default;