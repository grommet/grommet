"use strict";

exports.__esModule = true;
exports["default"] = exports.UpdateOnSubmit = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var UpdateOnSubmit = exports.UpdateOnSubmit = function UpdateOnSubmit() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
      color: "text-weak"
    }, "Note: Results are filtered once you hit enter."), /*#__PURE__*/_react["default"].createElement(_grommet.Data, {
      data: _data.DATA
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, null, /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, {
      updateOn: "submit"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.DataSummary, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      alignSelf: "start",
      columns: _data.columns
    })))
    // </Grommet>
  );
};
UpdateOnSubmit.args = {
  full: true
};
UpdateOnSubmit.parameters = {
  chromatic: {
    disable: true
  }
};
UpdateOnSubmit.storyName = 'Update on submit';
var _default = exports["default"] = {
  title: 'Data/DataSearch/Update on submit'
};