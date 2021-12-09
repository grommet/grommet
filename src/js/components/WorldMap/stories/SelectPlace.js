import React from 'react';

import { Box, WorldMap } from 'grommet';

export const SelectPlace = () => {
  const [places, setPlaces] = React.useState();

  const onSelectPlace = (place) => {
    console.log('Selected', place);
    setPlaces([{ color: 'graph-1', location: place }]);
  };

  return (
    <Box align="center" pad="large">
      <WorldMap onSelectPlace={onSelectPlace} places={places} />
    </Box>
  );
};

SelectPlace.storyName = 'Select place';

SelectPlace.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/WorldMap/Select place',
};
