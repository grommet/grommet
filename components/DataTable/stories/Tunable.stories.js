"use strict";

exports.__esModule = true;
exports["default"] = exports.TunableDataTable = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // Source code for the data can be found here
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