import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, WorldMap } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const SimpleWorldMap = () => {
  const [places, setPlaces] = React.useState();

  const onSelectPlace = place => {
    setPlaces([{ color: 'accent-1', location: place }]);
  };

  return (
    <MnetUIBase theme={mnet}>
      <Box align="center" pad="large">
        <WorldMap onSelectPlace={onSelectPlace} places={places} />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('WorldMap', module).add('Simple', () => <SimpleWorldMap />);
