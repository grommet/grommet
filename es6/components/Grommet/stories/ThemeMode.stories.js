// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Grommet, Box, grommet } from 'grommet';
export var ThemeMode = function ThemeMode() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    themeMode: "auto"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, "\"auto\" themeMode"));
};
export default {
  title: 'Utilities/Grommet/ThemeMode'
};