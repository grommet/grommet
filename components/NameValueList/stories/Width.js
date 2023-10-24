"use strict";

exports.__esModule = true;
exports["default"] = exports.Width = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Width = exports.Width = function Width() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "small",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold",
      size: "3xl"
    }, "Name width xsmall"), /*#__PURE__*/_react["default"].createElement(_grommet.NameValueList, {
      nameProps: {
        width: 'xsmall'
      }
    }, Object.entries(_data.data).map(function (_ref) {
      var name = _ref[0],
        value = _ref[1];
      return /*#__PURE__*/_react["default"].createElement(_grommet.NameValuePair, {
        name: name,
        key: name
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, value));
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold",
      size: "3xl"
    }, "Value width large"), /*#__PURE__*/_react["default"].createElement(_grommet.NameValueList, {
      valueProps: {
        width: 'large'
      }
    }, Object.entries(_data.data).map(function (_ref2) {
      var name = _ref2[0],
        value = _ref2[1];
      return /*#__PURE__*/_react["default"].createElement(_grommet.NameValuePair, {
        name: name,
        key: name
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, value));
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/NameValueList/Width'
};