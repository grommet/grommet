import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, RadioButton } from 'grommet';
import { grommet } from 'grommet/themes';

var DisabledRadioButton = function DisabledRadioButton() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, React.createElement(RadioButton, {
    label: "option 1",
    name: "name",
    value: "option 1",
    checked: true,
    disabled: true
  })));
};

storiesOf('RadioButton', module).add('Disabled', function () {
  return React.createElement(DisabledRadioButton, null);
});