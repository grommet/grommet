import React from 'react';
import { Box, MaskedInput } from 'grommet';
export var SizeUnitsMaskedInput = function SizeUnitsMaskedInput() {
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
        length: [1, 4],
        options: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
        regexp: /^\d{1,4}$/,
        placeholder: 'nnn'
      }, {
        fixed: ' '
      }, {
        length: 2,
        options: ['MB', 'GB', 'TB'],
        regexp: /^[mgt]b$|^[MGT]B$|^[mMgGtT]$/,
        placeholder: 'gb'
      }],
      value: value,
      onChange: function onChange(event) {
        return setValue(event.target.value);
      }
    })))
    // </Grommet>
  );
};

SizeUnitsMaskedInput.storyName = 'Size + units';
SizeUnitsMaskedInput.parameters = {
  chromatic: {
    disable: true
  }
};
SizeUnitsMaskedInput.args = {
  full: true
};
export default {
  title: 'Input/MaskedInput/Size + units'
};