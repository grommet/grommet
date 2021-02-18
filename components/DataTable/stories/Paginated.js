"use strict";

exports.__esModule = true;
exports["default"] = exports.Paginated = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Paginated = function Paginated() {
  var _React$useState = _react["default"].useState([]),
      select = _React$useState[0],
      setSelect = _React$useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: _data.columns,
    data: [].concat(_data.DATA),
    onSelect: setSelect,
    select: select,
    sortable: true,
    step: 3,
    paginate: true
  })));
};

exports.Paginated = Paginated;
var _default = {
  title: 'Visualizations/DataTable/Paginated'
};
exports["default"] = _default;