"use strict";

exports.__esModule = true;
exports["default"] = exports.Range = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Range = exports.Range = function Range() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      date: [['2020-04-03', '2020-04-08']],
      range: true
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Calendar/Range'
};