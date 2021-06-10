"use strict";

exports.__esModule = true;
exports["default"] = exports.ValidateOnMount = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ValidateOnMount = function ValidateOnMount() {
  var defaultValue = {
    firstName: 'J',
    lastName: ''
  };

  var _useState = (0, _react.useState)(false),
      valid = _useState[0],
      setValid = _useState[1];

  var _useState2 = (0, _react.useState)(defaultValue),
      value = _useState2[0],
      setValue = _useState2[1];

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
    value: value,
    validate: "change",
    onReset: function onReset(event) {
      return console.log(event);
    },
    onChange: function onChange(nextValue, _ref) {
      var touched = _ref.touched;
      console.log('Change', nextValue, touched);
      setValue(nextValue);
    },
    onValidate: function onValidate(validationResults) {
      console.log('validationResults = ', validationResults);
      setValid(validationResults.valid);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "First Name",
    name: "firstName",
    required: true,
    validate: [{
      regexp: /^[a-z]/i
    }, function (firstName) {
      if (firstName && firstName.length === 1) return 'must be >1 character';
      return undefined;
    }]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Last Name",
    name: "lastName",
    required: true,
    validate: [{
      regexp: /^[a-z]/i
    }, function (lastName) {
      if (lastName && lastName.length === 1) return 'must be >1 character';
      return undefined;
    }]
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
    disabled: !valid,
    primary: true
  }))))));
};

exports.ValidateOnMount = ValidateOnMount;
ValidateOnMount.storyName = 'Validate on mount';
var _default = {
  title: 'Input/Form/Validate on mount'
};
exports["default"] = _default;