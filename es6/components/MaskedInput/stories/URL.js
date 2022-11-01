import React from 'react';
import { Box, MaskedInput } from 'grommet';
export var UrlMaskedInput = function UrlMaskedInput() {
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
      width: "medium",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(MaskedInput, {
      mask: [{
        fixed: 'https://'
      }, {
        regexp: /^.*$/
      }],
      value: value,
      onChange: function onChange(event) {
        return setValue(event.target.value);
      }
    })))
    // </Grommet>
  );
};

UrlMaskedInput.storyName = 'URL';
UrlMaskedInput.parameters = {
  chromatic: {
    disable: true
  }
};
UrlMaskedInput.args = {
  full: true
};
export default {
  title: 'Input/MaskedInput/URL'
};