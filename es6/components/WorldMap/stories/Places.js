import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';

var Example = function Example() {
  var _React$useState = React.useState(),
      active = _React$useState[0],
      setActive = _React$useState[1];

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(WorldMap, {
    places: [{
      name: 'Sydney',
      location: [-33.8830555556, 151.216666667],
      color: 'graph-1',
      onClick: function onClick() {
        return setActive(!active);
      }
    }]
  }), active && React.createElement(Box, {
    margin: "large"
  }, "Sydney")));
};

storiesOf('WorldMap', module).add('Places', function () {
  return React.createElement(Example, null);
});