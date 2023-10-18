"use strict";

exports.__esModule = true;
exports["default"] = exports.Views = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _Data = require("../Data");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Views = exports.Views = function Views() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Grid, {
      flex: false,
      pad: "large",
      columns: [['small', 'large']],
      justifyContent: "center",
      gap: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
      status: "info",
      message: "Data is in 'beta'. The API surface is subject to change."
    }), /*#__PURE__*/_react["default"].createElement(_Data.Data, {
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
      }],
      toolbar: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
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