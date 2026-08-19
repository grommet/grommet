// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, TextInput } from 'grommet';
export var Password = function Password() {
  var _React$useState = React.useState(''),
    value = _React$useState[0],
    setValue = _React$useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "large",
      width: "medium"
    }, /*#__PURE__*/React.createElement(TextInput, {
      password: true,
      value: value,
      onChange: function onChange(event) {
        return setValue(event.target.value);
      },
      "aria-label": "Password"
    }))
    // </Grommet>
  );
};
export default {
  title: 'Input/TextInput/Password'
};