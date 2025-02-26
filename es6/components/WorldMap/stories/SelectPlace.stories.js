import React from 'react';
import { Box, WorldMap } from 'grommet';
export var SelectPlace = function SelectPlace() {
  var _React$useState = React.useState(),
    places = _React$useState[0],
    setPlaces = _React$useState[1];
  var onSelectPlace = function onSelectPlace(place) {
    console.log('Selected', place);
    setPlaces([{
      color: 'graph-1',
      location: place
    }]);
  };
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(WorldMap, {
    onSelectPlace: onSelectPlace,
    places: places
  }));
};
SelectPlace.storyName = 'Select place';
SelectPlace.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/WorldMap/Select place'
};