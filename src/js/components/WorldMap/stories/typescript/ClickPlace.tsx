import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, WorldMap, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  const [clickedPlace, setClickedPlace] = useState<[number, number]>();
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large" direction="column">
        <WorldMap onSelectPlace={place => setClickedPlace(place)} />
        <Box direction="row" width="100%">
          {clickedPlace && (
            <Text>
              Clicked place: {clickedPlace[0]}, {clickedPlace[1]}
            </Text>
          )}
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('WorldMap', module).add('TS-ClickPlace', () => <Example />);
