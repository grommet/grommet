"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Example = function Example() {
  var _React$useState = _react["default"].useState(),
      textInputValue = _React$useState[0],
      setTextInputValue = _React$useState[1];

  var _React$useState2 = _react["default"].useState(),
      maskedInputValue = _React$useState2[0],
      setMaskedInputValue = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(),
      checkBoxValue = _React$useState3[0],
      setCheckBoxValue = _React$useState3[1];

  var _React$useState4 = _react["default"].useState(),
      radioButtonGroupValue = _React$useState4[0],
      setRadioButtonValue = _React$useState4[1];

  var _React$useState5 = _react["default"].useState(),
      selectValue = _React$useState5[0],
      setSelectValue = _React$useState5[1];

  var _React$useState6 = _react["default"].useState(),
      textAreaValue = _React$useState6[0],
      setTextAreaValue = _React$useState6[1];

  var _React$useState7 = _react["default"].useState(),
      rangeInputValue = _React$useState7[0],
      setRangeInputValue = _React$useState7[1];

  return _react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, _react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, _react["default"].createElement(_grommet.Form, {
    onReset: function onReset() {
      setTextInputValue(undefined);
      setMaskedInputValue(undefined);
      setCheckBoxValue(undefined);
      setRadioButtonValue(undefined);
      setSelectValue(undefined);
      setTextAreaValue(undefined);
      setRangeInputValue(undefined);
    },
    onSubmit: function onSubmit(event) {
      return console.log('Submit', event.value);
    }
  }, _react["default"].createElement(_grommet.FormField, {
    label: "Name",
    name: "name"
  }, _react["default"].createElement(_grommet.TextInput, {
    name: "name",
    value: textInputValue,
    onChange: function onChange(event) {
      return setTextInputValue(event.target.value);
    }
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
    }],
    value: maskedInputValue,
    onChange: function onChange(event) {
      return setMaskedInputValue(event.target.value);
    }
  })), _react["default"].createElement(_grommet.FormField, {
    name: "subscribe"
  }, _react["default"].createElement(_grommet.CheckBox, {
    name: "subscribe",
    label: "Subscribe?",
    checked: checkBoxValue,
    onChange: function onChange(event) {
      return setCheckBoxValue(event.target.checked);
    }
  })), _react["default"].createElement(_grommet.FormField, {
    name: "ampm"
  }, _react["default"].createElement(_grommet.RadioButtonGroup, {
    name: "ampm",
    options: ['morning', 'evening'],
    value: radioButtonGroupValue,
    onChange: function onChange(event) {
      return setRadioButtonValue(event.target.value);
    }
  })), _react["default"].createElement(_grommet.FormField, {
    label: "Size",
    name: "size"
  }, _react["default"].createElement(_grommet.Select, {
    name: "size",
    options: ['small', 'medium', 'large'],
    value: selectValue,
    onChange: function onChange(event) {
      return setSelectValue(event.option);
    }
  })), _react["default"].createElement(_grommet.FormField, {
    label: "Comments",
    name: "comments"
  }, _react["default"].createElement(_grommet.TextArea, {
    name: "comments",
    value: textAreaValue,
    onChange: function onChange(event) {
      return setTextAreaValue(event.target.value);
    }
  })), _react["default"].createElement(_grommet.FormField, {
    label: "Age",
    name: "age",
    pad: true
  }, _react["default"].createElement(_grommet.RangeInput, {
    name: "age",
    min: 15,
    max: 75,
    value: rangeInputValue,
    onChange: function onChange(event) {
      return setRangeInputValue(event.target.value);
    }
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

(0, _react2.storiesOf)('Form', module).add('Controlled Input', function () {
  return _react["default"].createElement(Example, null);
});