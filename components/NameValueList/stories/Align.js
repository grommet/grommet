"use strict";

exports.__esModule = true;
exports["default"] = exports.Align = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Align = function Align() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
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
  }))), /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
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
  })))));
};

exports.Align = Align;
var _default = {
  title: 'Visualizations/NameValueList/Align'
};
exports["default"] = _default;