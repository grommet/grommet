"use strict";

exports.__esModule = true;
exports.Sort = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Sort = function Sort() {
  var _React$useState = _react["default"].useState({
    property: 'name',
    direction: 'desc'
  }),
      sort = _React$useState[0],
      setSort = _React$useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: _data.columns.map(function (c) {
      return _extends({}, c, {
        search: c.property === 'name' || c.property === 'location'
      });
    }),
    data: _data.DATA,
    sort: sort,
    onSort: setSort,
    resizeable: true
  })));
};

exports.Sort = Sort;