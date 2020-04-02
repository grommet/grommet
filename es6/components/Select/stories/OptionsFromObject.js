import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, Grommet, Select } from 'grommet';
var objectOptions = [{
  label: 'Male',
  value: 1
}, {
  label: 'Female',
  value: 2
}, {
  label: 'Non Binary',
  value: 3
}, {
  label: 'Other',
  value: 4
}];

var OptionsFromObject = function OptionsFromObject() {
  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, React.createElement(Select, {
    id: "select",
    name: "select",
    placeholder: "Select",
    labelKey: "label",
    value: value,
    options: objectOptions,
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setValue(option);
    }
  })));
};

storiesOf('Select', module).add('Options from object', function () {
  return React.createElement(OptionsFromObject, null);
});