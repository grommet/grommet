"use strict";

exports.__esModule = true;
exports.ControlledLazy = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var defaultValue = {
  name: '',
  email: '',
  subscribe: false,
  ampm: '',
  size: '',
  comments: '',
  age: ''
};

var ControlledLazy = function ControlledLazy() {
  var _useState = (0, _react.useState)(defaultValue),
      value = _useState[0],
      setValue = _useState[1];

  (0, _react.useEffect)(function () {
    return setValue({
      name: 'initial',
      email: 'initial@my.com',
      subscribe: true,
      ampm: 'evening',
      size: 'large',
      comments: 'initial',
      age: 60
    });
  }, []);
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
    onChange: function onChange(nextValue) {
      console.log('Change', nextValue);
      setValue(nextValue);
    },
    onReset: function onReset() {
      return setValue(defaultValue);
    },
    onSubmit: function onSubmit(event) {
      return console.log('Submit', event.value, event.touched);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Name",
    name: "name"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    name: "name"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Email",
    name: "email",
    required: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.MaskedInput, {
    name: "email",
    mask: [{
      regexp: /^[\w\-_.]+$/,
      placeholder: 'example'
    }, {
      fixed: '@'
    }, {
      regexp: /^[\w]+$/,
      placeholder: 'my'
    }, {
      fixed: '.'
    }, {
      regexp: /^[\w]+$/,
      placeholder: 'com'
    }]
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "subscribe"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    name: "subscribe",
    label: "Subscribe?"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "ampm"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    name: "ampm",
    options: ['morning', 'evening']
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Size",
    name: "size"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    name: "size",
    options: ['small', 'medium', 'large']
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Comments",
    name: "comments"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, {
    name: "comments"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Age",
    name: "age",
    pad: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RangeInput, {
    name: "age",
    min: 15,
    max: 75
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

exports.ControlledLazy = ControlledLazy;
ControlledLazy.story = {
  name: 'Controlled lazy',
  parameters: {
    // chromatic disabled because snapshot is the same as Controlled
    chromatic: {
      disable: true
    }
  }
};