import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleWorldMap = function SimpleWorldMap() {
  var _React$useState = React.useState(),
      places = _React$useState[0],
      setPlaces = _React$useState[1];

  var onSelectPlace = function onSelectPlace(place) {
    setPlaces([{
      color: 'accent-1',
      location: place
    }]);
  };

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(WorldMap, {
    onSelectPlace: onSelectPlace,
    places: places
  })));
};

storiesOf('WorldMap', module).add('Simple', function () {
  return React.createElement(SimpleWorldMap, null);
});