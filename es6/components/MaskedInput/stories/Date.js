import React from 'react';
import { Box, MaskedInput } from 'grommet';
var daysInMonth = function daysInMonth(month) {
  return new Date(2019, month, 0).getDate();
};
export var DateMaskedInput = function DateMaskedInput() {
  var _React$useState = React.useState(''),
    value = _React$useState[0],
    setValue = _React$useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Box, {
      width: "medium"
    }, /*#__PURE__*/React.createElement(MaskedInput, {
      mask: [{
        length: [1, 2],
        options: Array.from({
          length: 12
        }, function (v, k) {
          return k + 1;
        }),
        regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
        placeholder: 'mm'
      }, {
        fixed: '/'
      }, {
        length: [1, 2],
        options: Array.from({
          length: daysInMonth(parseInt(value.split('/')[0], 10))
        }, function (v, k) {
          return k + 1;
        }),
        regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
        placeholder: 'dd'
      }, {
        fixed: '/'
      }, {
        length: 4,
        options: Array.from({
          length: 100
        }, function (v, k) {
          return 2019 - k;
        }),
        regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
        placeholder: 'yyyy'
      }],
      value: value,
      onChange: function onChange(event) {
        return setValue(event.target.value);
      }
    })))
    // </Grommet>
  );
};

DateMaskedInput.storyName = 'Date';
DateMaskedInput.parameters = {
  chromatic: {
    disable: true
  }
};
DateMaskedInput.args = {
  full: true
};
export default {
  title: 'Input/MaskedInput/Date'
};