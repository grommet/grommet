"use strict";

exports.__esModule = true;
exports["default"] = exports.VerticalAlign = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js

var VerticalAlign = exports.VerticalAlign = function VerticalAlign() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: [{
        property: 'large',
        header: 'This header name is long and wraps',
        render: function render() {
          return 'This content is long and wraps a lot too.';
        },
        size: 'small',
        footer: 'This footer content is long and wraps.'
      }].concat(_data.columns),
      data: _data.DATA,
      step: 10,
      verticalAlign: {
        header: 'bottom',
        body: 'top',
        footer: 'top'
      }
    }))
    // </Grommet>
  );
};

VerticalAlign.storyName = 'Vertical Align';
var _default = exports["default"] = {
  title: 'Visualizations/DataTable/Vertical Align'
};