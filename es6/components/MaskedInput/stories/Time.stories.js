import React from 'react';
import { Box, MaskedInput } from 'grommet';
export var Time = function Time() {
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
      id: "grommet-maskedinput-time",
      mask: [{
        length: [1, 2],
        options: Array.from({
          length: 12
        }, function (v, k) {
          return k + 1;
        }),
        regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
        placeholder: 'hh'
      }, {
        fixed: ':'
      }, {
        length: 2,
        options: ['00', '15', '30', '45'],
        regexp: /^[0-5][0-9]$|^[0-9]$/,
        placeholder: 'mm'
      }, {
        fixed: ' '
      }, {
        length: 2,
        options: ['am', 'pm'],
        regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
        placeholder: 'ap'
      }],
      value: value,
      onChange: function onChange(event) {
        return setValue(event.target.value);
      }
    })))
    // </Grommet>
  );
};
Time.args = {
  full: true
};
export default {
  title: 'Input/MaskedInput/Time'
};