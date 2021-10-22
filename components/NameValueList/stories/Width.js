"use strict";

exports.__esModule = true;
exports["default"] = exports.Width = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Width = function Width() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "large",
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
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
  }))), /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
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
  })))));
};

exports.Width = Width;
var _default = {
  title: 'Visualizations/NameValueList/Width'
};
exports["default"] = _default;