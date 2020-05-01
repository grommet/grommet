import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, RadioButton } from 'grommet';
import { grommet } from 'grommet/themes';

var DisabledRadioButton = function DisabledRadioButton() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(RadioButton, {
    label: "option 1",
    name: "name",
    value: "option 1",
    checked: true,
    disabled: true
  })));
};

storiesOf('RadioButton', module).add('Disabled', function () {
  return /*#__PURE__*/React.createElement(DisabledRadioButton, null);
});