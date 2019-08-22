import React from 'react';
import { storiesOf } from '@storybook/react';
import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var Default = function Default() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Anchor, {
    href: "#"
  }, "Link")));
};

storiesOf('Anchor', module).add('Default', function () {
  return React.createElement(Default, null);
});