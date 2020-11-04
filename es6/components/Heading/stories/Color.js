import React from 'react';
import { Grommet, Heading } from 'grommet';
import { grommet } from 'grommet/themes';
export var Color = function Color() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Heading, {
    color: "accent-1"
  }, "Colored Heading"));
};