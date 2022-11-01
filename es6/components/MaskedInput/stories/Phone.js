import React from 'react';
import { Box, MaskedInput } from 'grommet';
export var Phone = function Phone() {
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
        fixed: '('
      }, {
        length: 3,
        regexp: /^[0-9]{1,3}$/,
        placeholder: 'xxx'
      }, {
        fixed: ')'
      }, {
        fixed: ' '
      }, {
        length: 3,
        regexp: /^[0-9]{1,3}$/,
        placeholder: 'xxx'
      }, {
        fixed: '-'
      }, {
        length: 4,
        regexp: /^[0-9]{1,4}$/,
        placeholder: 'xxxx'
      }],
      value: value,
      onChange: function onChange(event) {
        return setValue(event.target.value);
      }
    })))
    // </Grommet>
  );
};

Phone.args = {
  full: true
};
export default {
  title: 'Input/MaskedInput/Phone'
};