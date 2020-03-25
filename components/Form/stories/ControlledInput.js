"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Example = function Example() {
  var _React$useState = _react["default"].useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

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
    onReset: function onReset(event) {
      console.log(event);
      setValue('');
    },
    onSubmit: function onSubmit(event) {
      return console.log('Submit', event.value);
    }
  }, _react["default"].createElement(_grommet.FormField, {
    label: "Name",
    name: "name"
  }, _react["default"].createElement(_grommet.TextInput, {
    name: "name",
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
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