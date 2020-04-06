import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';

var Example = function Example() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(WorldMap, {
    color: "graph-1"
  })));
};

storiesOf('WorldMap', module).add('Color', function () {
  return React.createElement(Example, null);
});