"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Example = function Example() {
  var _React$useState = _react["default"].useState(''),
      name = _React$useState[0],
      setName = _React$useState[1];

  var _React$useState2 = _react["default"].useState(''),
      email = _React$useState2[0],
      setEmail = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(false),
      subscribe = _React$useState3[0],
      setSubscribe = _React$useState3[1];

  var _React$useState4 = _react["default"].useState(''),
      ampm = _React$useState4[0],
      setAmpm = _React$useState4[1];

  var _React$useState5 = _react["default"].useState(''),
      size = _React$useState5[0],
      setSize = _React$useState5[1];

  var _React$useState6 = _react["default"].useState(''),
      comments = _React$useState6[0],
      setComments = _React$useState6[1];

  var _React$useState7 = _react["default"].useState(''),
      age = _React$useState7[0],
      setAge = _React$useState7[1];

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
    onChange: function onChange(value) {
      return console.log('Change', value);
    },
    onReset: function onReset() {
      setName('');
      setEmail('');
      setSubscribe(false);
      setAmpm('');
      setSize('');
      setComments('');
      setAge('');
    },
    onSubmit: function onSubmit(event) {
      return console.log('Submit', event.value, event.touched);
    }
  }, _react["default"].createElement(_grommet.FormField, {
    label: "Name",
    name: "name"
  }, _react["default"].createElement(_grommet.TextInput, {
    name: "name",
    value: name,
    onChange: function onChange(event) {
      return setName(event.target.value);
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
    value: email,
    onChange: function onChange(event) {
      return setEmail(event.target.value);
    }
  })), _react["default"].createElement(_grommet.FormField, {
    name: "subscribe"
  }, _react["default"].createElement(_grommet.CheckBox, {
    name: "subscribe",
    label: "Subscribe?",
    checked: subscribe,
    onChange: function onChange(event) {
      return setSubscribe(event.target.checked);
    }
  })), _react["default"].createElement(_grommet.FormField, {
    name: "ampm"
  }, _react["default"].createElement(_grommet.RadioButtonGroup, {
    name: "ampm",
    options: ['morning', 'evening'],
    value: ampm,
    onChange: function onChange(event) {
      return setAmpm(event.target.value);
    }
  })), _react["default"].createElement(_grommet.FormField, {
    label: "Size",
    name: "size"
  }, _react["default"].createElement(_grommet.Select, {
    name: "size",
    options: ['small', 'medium', 'large'],
    value: size,
    onChange: function onChange(event) {
      return setSize(event.option);
    }
  })), _react["default"].createElement(_grommet.FormField, {
    label: "Comments",
    name: "comments"
  }, _react["default"].createElement(_grommet.TextArea, {
    name: "comments",
    value: comments,
    onChange: function onChange(event) {
      return setComments(event.target.value);
    }
  })), _react["default"].createElement(_grommet.FormField, {
    label: "Age",
    name: "age",
    pad: true
  }, _react["default"].createElement(_grommet.RangeInput, {
    name: "age",
    min: 15,
    max: 75,
    value: age,
    onChange: function onChange(event) {
      return setAge(event.target.value);
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