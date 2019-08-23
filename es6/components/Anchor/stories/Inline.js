import React from 'react';
import { storiesOf } from '@storybook/react';
import { Anchor, Box, Grommet, Paragraph } from 'grommet';
import { grommet } from 'grommet/themes';

var Inline = function Inline() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Paragraph, null, "This is ", React.createElement(Anchor, {
    label: "an inline link",
    href: "#"
  }), " with surrounding text.")));
};

storiesOf('Anchor', module).add('Inline', function () {
  return React.createElement(Inline, null);
});