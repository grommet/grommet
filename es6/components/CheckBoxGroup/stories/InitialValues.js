import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, CheckBoxGroup, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var Example = function Example() {
  var _useState = useState(['First', 'Second']),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = useState(['M']),
      value2 = _useState2[0],
      setValue2 = _useState2[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    gap: "large"
  }, "Initial value via options object:", /*#__PURE__*/React.createElement(CheckBoxGroup, {
    value: value,
    onChange: function onChange(event) {
      console.log('value: ', event.value);
      console.log('option: ', event.option);
      setValue(event.value);
    },
    options: ['First', 'Second', 'Third']
  }), "Initial value via controlled options object:", /*#__PURE__*/React.createElement(CheckBoxGroup, {
    labelKey: "label",
    valueKey: "id",
    value: value2,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value,
          option = _ref.option;
      console.log('nextValue: ', nextValue);
      console.log('option: ', option);
      setValue2(nextValue);
    },
    options: [{
      label: 'Maui',
      id: 'M'
    }, {
      label: 'Jerusalem',
      id: 'J'
    }, {
      label: 'Wuhan',
      id: 'W'
    }]
  })));
};

storiesOf('CheckBoxGroup', module).add('Initial value', function () {
  return /*#__PURE__*/React.createElement(Example, null);
});