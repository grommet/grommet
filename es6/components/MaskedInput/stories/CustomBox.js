import React from 'react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';
export var CustomBoxMaskedInput = function CustomBoxMaskedInput() {
  var _React$useState = React.useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var _React$useState2 = React.useState(),
      box = _React$useState2[0],
      setBox = _React$useState2[1];

  var boxRef = React.useCallback(setBox, []);
  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: {
      horizontal: 'xsmall'
    },
    border: "all",
    ref: boxRef,
    wrap: true
  }, /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": "Disk size"
  }, "\uD83D\uDCBE"), /*#__PURE__*/React.createElement(Box, {
    flex: true,
    width: "medium",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(MaskedInput, {
    plain: true,
    dropProps: {
      target: box
    },
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
  }))));
};
CustomBoxMaskedInput.storyName = 'Custom box';
CustomBoxMaskedInput.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/MaskedInput/Custom box'
};