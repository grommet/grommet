"use strict";

exports.__esModule = true;
exports.ValidateOnBlur = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ValidateOnBlur = function ValidateOnBlur() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    validate: "blur",
    onReset: function onReset(event) {
      return console.log(event);
    },
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value;
      return console.log('Submit', value);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Name",
    name: "name",
    required: true,
    validate: [{
      regexp: /^[a-z]/i
    }, function (name) {
      if (name && name.length === 1) return 'must be >1 character';
      return undefined;
    }, function (name) {
      if (name === 'good') return {
        message: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
          align: "end"
        }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.StatusGood, null)),
        status: 'info'
      };
      return undefined;
    }]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Email",
    name: "email",
    required: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    name: "email",
    type: "email"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "between",
    margin: {
      top: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Cancel"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "reset",
    label: "Reset"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "Update",
    primary: true
  }))))));
};

exports.ValidateOnBlur = ValidateOnBlur;
ValidateOnBlur.story = {
  name: 'Validate on blur'
};