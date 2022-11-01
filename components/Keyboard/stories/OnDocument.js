"use strict";

exports.__esModule = true;
exports["default"] = exports.OnDocument = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var OnDocument = function OnDocument() {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Keyboard, {
    target: "document",
    onEsc: function onEsc() {
      return alert('You pressed Esc!');
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    background: "light-4"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: "3"
  }, "Press Esc on me!"))));
};
exports.OnDocument = OnDocument;
OnDocument.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Utilities/Keyboard/On Document'
};
exports["default"] = _default;