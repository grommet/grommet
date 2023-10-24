"use strict";

exports.__esModule = true;
exports["default"] = exports.Align = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Align = exports.Align = function Align() {
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
    }, "Align value end"), /*#__PURE__*/_react["default"].createElement(_grommet.NameValueList, {
      valueProps: {
        align: 'end'
      }
    }, Object.entries(_data.data).map(function (_ref) {
      var name = _ref[0],
        value = _ref[1];
      return /*#__PURE__*/_react["default"].createElement(_grommet.NameValuePair, {
        key: name,
        name: name
      }, value);
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold",
      size: "3xl"
    }, "Align name end"), /*#__PURE__*/_react["default"].createElement(_grommet.NameValueList, {
      nameProps: {
        align: 'end'
      }
    }, Object.entries(_data.data).map(function (_ref2) {
      var name = _ref2[0],
        value = _ref2[1];
      return /*#__PURE__*/_react["default"].createElement(_grommet.NameValuePair, {
        key: name,
        name: name
      }, value);
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/NameValueList/Align'
};