"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _utils = require("grommet/utils");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customFormFieldTheme = {
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

var CustomFormField = function CustomFormField() {
  return _react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: (0, _utils.deepMerge)(_grommet.grommet, customFormFieldTheme)
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, _react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, _react["default"].createElement(_grommet.Form, {
    onReset: function onReset(event) {
      return console.log(event);
    },
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value;
      return console.log('Submit', value);
    }
  }, _react["default"].createElement(_grommet.FormField, {
    label: "Name",
    name: "name",
    required: true
  }, _react["default"].createElement(_grommet.TextInput, {
    name: "name"
  })), _react["default"].createElement(_grommet.FormField, {
    label: "Email",
    name: "email",
    required: true
  }, _react["default"].createElement(_grommet.MaskedInput, {
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
  })), _react["default"].createElement(_grommet.FormField, {
    name: "subscribe"
  }, _react["default"].createElement(_grommet.CheckBox, {
    name: "subscribe",
    label: "Subscribe?"
  })), _react["default"].createElement(_grommet.FormField, {
    name: "ampm"
  }, _react["default"].createElement(_grommet.RadioButtonGroup, {
    name: "ampm",
    options: ['morning', 'evening']
  })), _react["default"].createElement(_grommet.FormField, {
    label: "Size",
    name: "size"
  }, _react["default"].createElement(_grommet.Select, {
    name: "size",
    options: ['small', 'medium', 'large']
  })), _react["default"].createElement(_grommet.FormField, {
    label: "Comments",
    name: "comments",
    disabled: true
  }, _react["default"].createElement(_grommet.TextArea, {
    name: "comments",
    disabled: true
  })), _react["default"].createElement(_grommet.FormField, {
    label: "Age",
    name: "age"
  }, _react["default"].createElement(_grommet.RangeInput, {
    name: "age",
    min: 15,
    max: 75
  })), _react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "between",
    margin: {
      top: 'medium'
    }
  }, _react["default"].createElement(_grommet.Button, {
    label: "Cancel"
  }), _react["default"].createElement(_grommet.Button, {
    type: "reset",
    label: "Reset"
  }), _react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "Update",
    primary: true
  }))))));
};

(0, _react2.storiesOf)('Form', module).add('Custom Theme', function () {
  return _react["default"].createElement(CustomFormField, null);
});