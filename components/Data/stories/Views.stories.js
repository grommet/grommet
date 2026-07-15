"use strict";

exports.__esModule = true;
exports["default"] = exports.Views = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Views = exports.Views = function Views() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Data, {
      data: _data.DATA,
      views: [{
        name: 'latest',
        sort: {
          property: 'date',
          direction: 'desc'
        }
      }, {
        name: 'Bay Area behind',
        properties: {
          percent: {
            min: 0,
            max: 50
          },
          location: ['San Francisco']
        }
      }, {
        name: 'Fewer Columns',
        columns: ['name', 'location']
      }],
      toolbar: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      alignSelf: "start",
      columns: _data.columns
    })))
    // </Grommet>
  );
};
Views.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Data/Data/Views'
};