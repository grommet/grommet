import React from 'react';
import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var DisabledAnchor = function DisabledAnchor() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    margin: "small"
  }, /*#__PURE__*/React.createElement(Anchor, {
    disabled: true,
    label: "Disabled Anchor"
  }))));
};

export var Disabled = function Disabled() {
  return /*#__PURE__*/React.createElement(DisabledAnchor, null);
};