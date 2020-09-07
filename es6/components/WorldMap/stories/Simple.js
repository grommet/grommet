import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';

var Example = function Example() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(WorldMap, null)));
}; // chromatic disabled because snapshot is the same as SelectPlace


storiesOf('WorldMap', module).add('Simple', function () {
  return /*#__PURE__*/React.createElement(Example, null);
}, {
  chromatic: {
    disable: true
  }
});