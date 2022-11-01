"use strict";

exports.__esModule = true;
exports["default"] = exports.TunableDataTable = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var TunableDataTable = function TunableDataTable() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: _data.columns.map(function (c) {
        return _extends({}, c, {
          search: c.property === 'name' || c.property === 'location'
        });
      }),
      data: _data.DATA,
      sortable: true,
      resizeable: true
    }))
    // </Grommet>
  );
};
exports.TunableDataTable = TunableDataTable;
TunableDataTable.storyName = 'Tunable';
var _default = {
  title: 'Visualizations/DataTable/Tunable'
};
exports["default"] = _default;