import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, WorldMap, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  const [activeContinent, setActiveContinent] = useState<string>();
  const [activePlace, setActivePlace] = useState<string>();
  const [selectedPlace, setSelectedPlace] = useState<[number, number]>();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large" direction="column">
        <WorldMap
          continents={[
            {
              name: 'South America',
              color: 'graph-1',
              onClick: name => setActiveContinent(name),
              onHover: hovered => setIsHovered(hovered),
            },
            {
              name: 'Europe',
              color: 'graph-1',
              onClick: name => setActiveContinent(name),
              onHover: hovered => setIsHovered(hovered),
            },
          ]}
          places={[
            {
              name: 'Sydney',
              location: [-33.8830555556, 151.216666667],
              color: 'graph-1',
              onClick: name => setActivePlace(name),
              onHover: hovered => setIsHovered(hovered),
            },
            {
              name: 'Houston',
              location: [29.8174782, -95.6814744],
              color: 'graph-1',
              onClick: name => setActivePlace(name),
              onHover: hovered => setIsHovered(hovered),
            },
          ]}
        />
        <Box direction="row" justify="between" width="100%">
          {activePlace && <Text>Active place: {activePlace}</Text>}
          {activeContinent && <Text>Active continent: {activeContinent}</Text>}
          <Text>Hovered: {isHovered ? 'yes' : 'no'}</Text>
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('WorldMap', module).add('TS-Places', () => <Example />);
