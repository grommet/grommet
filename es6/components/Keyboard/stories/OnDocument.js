import React from 'react';
import { Box, Grommet, Heading, Keyboard } from 'grommet';
import { grommet } from 'grommet/themes';
export var OnDocument = function OnDocument() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Keyboard, {
    target: "document",
    onEsc: function onEsc() {
      return alert('You pressed Esc!');
    }
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    background: "light-4"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "3"
  }, "Press Esc on me!"))));
};
OnDocument.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Utilities/Keyboard/On Document'
};