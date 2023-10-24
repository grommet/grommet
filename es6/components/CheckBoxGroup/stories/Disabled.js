import React from 'react';
import { Box, CheckBoxGroup, Text } from 'grommet';
export var Disabled = function Disabled() {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    margin: {
      vertical: 'small'
    }
  }, "Disabled Group"), /*#__PURE__*/React.createElement(CheckBoxGroup, {
    disabled: true,
    options: ['First', 'Second', 'Third']
  })), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    margin: {
      vertical: 'small'
    }
  }, " Disabled Individuals"), /*#__PURE__*/React.createElement(CheckBoxGroup, {
    name: "destinations",
    valueKey: "id",
    "aria-labelledby": "drink-formfield-id",
    options: [{
      label: 'Maui',
      id: '1',
      disabled: true
    }, {
      label: 'Jerusalem',
      id: '2'
    }, {
      label: 'Wuhan',
      id: '3',
      disabled: true
    }]
  })));
};
export default {
  title: 'Input/CheckBoxGroup/Disabled'
};