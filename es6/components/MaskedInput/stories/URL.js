import React from 'react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';
export var UrlMaskedInput = function UrlMaskedInput() {
  var _React$useState = React.useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
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
  }))));
};
UrlMaskedInput.storyName = 'URL';
UrlMaskedInput.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/MaskedInput/URL'
};