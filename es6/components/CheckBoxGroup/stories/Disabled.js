import React from 'react';
import { Box, CheckBoxGroup, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var Disabled = function Disabled() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
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
    options: [{
      label: 'Maui',
      disabled: true
    }, {
      label: 'Jerusalem'
    }, {
      label: 'Wuhan',
      disabled: true
    }]
  }))));
};