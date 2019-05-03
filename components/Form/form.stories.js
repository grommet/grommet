"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Example = function Example() {
  return _react.default.createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, _react.default.createElement(_grommet.Box, {
    width: "medium"
  }, _react.default.createElement(_grommet.Form, {
    onReset: function onReset(event) {
      return console.log(event);
    },
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value;
      return console.log('Submit', value);
    }
  }, _react.default.createElement(_grommet.FormField, {
    label: "Name",
    name: "name",
    required: true,
    validate: {
      regexp: /^[a-z]/i
    }
  }), _react.default.createElement(_grommet.FormField, {
    label: "Email",
    name: "email",
    type: "email",
    required: true
  }), _react.default.createElement(_grommet.FormField, {
    label: "Employee ID",
    name: "employeeId",
    required: true,
    validate: {
      regexp: /^[0-9]{4,6}$/,
      message: '4-6 digits'
    }
  }), _react.default.createElement(_grommet.FormField, {
    name: "subscribe",
    component: _grommet.CheckBox,
    pad: true,
    label: "Subscribe?"
  }), _react.default.createElement(_grommet.FormField, {
    name: "ampm",
    component: _grommet.RadioButtonGroup,
    pad: true,
    options: ['morning', 'evening']
  }), _react.default.createElement(_grommet.FormField, {
    label: "Size",
    name: "size",
    component: _grommet.Select,
    onChange: function onChange(event) {
      return console.log(event);
    },
    options: ['small', 'medium', 'large', 'xlarge']
  }), _react.default.createElement(_grommet.FormField, {
    label: "Comments",
    name: "comments",
    component: _grommet.TextArea
  }), _react.default.createElement(_grommet.FormField, {
    label: "Age",
    name: "age",
    component: _grommet.RangeInput,
    pad: true,
    min: 15,
    max: 75
  }), _react.default.createElement(_grommet.Box, {
    direction: "row",
    justify: "between",
    margin: {
      top: 'medium'
    }
  }, _react.default.createElement(_grommet.Button, {
    label: "Cancel"
  }), _react.default.createElement(_grommet.Button, {
    type: "reset",
    label: "Reset"
  }), _react.default.createElement(_grommet.Button, {
    type: "submit",
    label: "Update",
    primary: true
  }))))));
};

(0, _react2.storiesOf)('Form', module).add('All', function () {
  return _react.default.createElement(Example, null);
});