"use strict";

exports.__esModule = true;
exports.Custom = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customTheme = {
  global: {
    font: {
      size: '16px'
    },
    input: {
      weight: 400
    }
  },
  formField: {
    label: {
      color: 'dark-3',
      size: 'small',
      margin: 'xsmall',
      weight: 600
    },
    border: {
      position: 'outer',
      side: 'all'
    },
    disabled: {
      background: {
        color: 'status-disabled',
        opacity: true
      }
    },
    content: {
      pad: 'small'
    },
    error: {
      background: {
        color: 'status-critical',
        opacity: 'weak'
      }
    },
    margin: 'none'
  }
};

var Custom = function Custom() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: (0, _utils.deepMerge)(_themes.grommet, customTheme)
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
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
    required: true
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
    name: "comments",
    disabled: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, {
    name: "comments",
    disabled: true
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Age",
    name: "age"
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

exports.Custom = Custom;