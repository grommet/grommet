import React from 'react';
import { storiesOf } from '@storybook/react';
import { Anchor, Box, Grommet, Paragraph } from 'grommet';
import { grommet } from 'grommet/themes';

var Inline = function Inline() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Paragraph, null, "This is ", /*#__PURE__*/React.createElement(Anchor, {
    label: "an inline link",
    href: "#"
  }), " with surrounding text.")));
};

storiesOf('Anchor', module).add('Inline', function () {
  return /*#__PURE__*/React.createElement(Inline, null);
});