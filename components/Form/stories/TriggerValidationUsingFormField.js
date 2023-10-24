"use strict";

exports.__esModule = true;
exports["default"] = exports.TriggerValidationUsingFormField = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var TriggerValidationUsingFormField = exports.TriggerValidationUsingFormField = function TriggerValidationUsingFormField() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    alignSelf: "center",
    level: "2"
  }, "Validate On"), /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    onReset: function onReset(event) {
      return console.log(event);
    },
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value;
      return console.log('Submit', value);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Blur",
    name: "blur",
    "aria-label": "blur",
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
    }],
    validateOn: "blur"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Submit",
    name: "submit",
    "aria-label": "submit",
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
    }],
    validateOn: "submit"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Change",
    name: "change",
    "aria-label": "change",
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
    }],
    validateOn: "change"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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
  })))));
};
TriggerValidationUsingFormField.storyName = 'Trigger Validation using Form Field';
var _default = exports["default"] = {
  title: 'Input/Form/Trigger Validation using Form Field'
};