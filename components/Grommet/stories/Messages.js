"use strict";

exports.__esModule = true;
exports["default"] = exports.Messages = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var messageBundle = {
  'form.required': '必填项目',
  'fileInput.browse': '浏览'
};
var customMessages = {
  messages: {
    form: {
      required: 'necesario'
    },
    fileInput: {
      browse: 'navegar'
    }
  }
};

var Messages = function Messages() {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    messages: customMessages
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2
  }, "Custom messages"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    validate: "blur"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "name",
    label: "Name",
    required: true
  }), /*#__PURE__*/_react["default"].createElement(_grommet.FileInput, null)))), /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    messages: {
      format: function format(options) {
        return messageBundle[options.id];
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2
  }, "Message function"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    validate: "blur"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "name",
    label: "Name",
    required: true
  }), /*#__PURE__*/_react["default"].createElement(_grommet.FileInput, null)))));
};

exports.Messages = Messages;
var _default = {
  title: 'Utilities/Grommet/Messages'
};
exports["default"] = _default;