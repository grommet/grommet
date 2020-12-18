import React from 'react';
import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';
export var SelectPlace = function SelectPlace() {
  var _React$useState = React.useState(),
      places = _React$useState[0],
      setPlaces = _React$useState[1];

  var onSelectPlace = function onSelectPlace(place) {
    setPlaces([{
      color: 'graph-1',
      location: place
    }]);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(WorldMap, {
    onSelectPlace: onSelectPlace,
    places: places
  })));
};
SelectPlace.story = {
  name: 'Select place',
  parameters: {
    chromatic: {
      disable: true
    }
  }
};