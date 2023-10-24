"use strict";

exports.__esModule = true;
exports["default"] = exports.TunableDataTable = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } // Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
var TunableDataTable = exports.TunableDataTable = function TunableDataTable() {
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

TunableDataTable.storyName = 'Tunable';
var _default = exports["default"] = {
  title: 'Visualizations/DataTable/Tunable'
};