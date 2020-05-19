import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, CheckBoxGroup, Form, FormField, Grommet, Heading } from 'grommet';
import { grommet } from 'grommet/themes';

var CheckBoxGroupForm = function CheckBoxGroupForm() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "3"
  }, "Form with string options"), /*#__PURE__*/React.createElement(Form, {
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value,
          touched = _ref.touched;
      return console.log('Submit', value, touched);
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    name: "am-pm",
    component: CheckBoxGroup,
    options: ['morning', 'evening']
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    label: "Submit"
  }))), /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "3"
  }, "Form with object options"), /*#__PURE__*/React.createElement(Form, {
    onSubmit: function onSubmit(_ref2) {
      var value = _ref2.value,
          touched = _ref2.touched;
      return console.log('Submit object options', value, touched);
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    name: "drink"
  }, /*#__PURE__*/React.createElement(CheckBoxGroup, {
    name: "drink",
    valueKey: "id",
    options: [{
      label: 'Coffee',
      id: '1'
    }, {
      label: 'Tea',
      id: '2'
    }, {
      label: 'Milk',
      id: '3'
    }]
  })), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    label: "Submit"
  }))));
};

storiesOf('CheckBoxGroup', module).add('Form uncontrolled', function () {
  return /*#__PURE__*/React.createElement(CheckBoxGroupForm, null);
});