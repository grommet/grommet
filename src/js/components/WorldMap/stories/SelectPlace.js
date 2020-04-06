import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  const [places, setPlaces] = React.useState();

  const onSelectPlace = place => {
    setPlaces([{ color: 'graph-1', location: place }]);
  };

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <WorldMap onSelectPlace={onSelectPlace} places={places} />
      </Box>
    </Grommet>
  );
};

storiesOf('WorldMap', module).add('Select place', () => <Example />);
