"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _DataView = require("../DataView");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
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
        name: 'behind',
        properties: {
          percent: {
            min: 0,
            max: 30
          }
        }
      }]
    }, /*#__PURE__*/_react["default"].createElement(_DataView.DataView, null)))
    // </Grommet>
  );
};
exports.Simple = Simple;
Simple.args = {
  full: true
};
var _default = {
  title: 'Layout/Data/DataView/Simple'
};
exports["default"] = _default;