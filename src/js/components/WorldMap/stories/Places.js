import React from 'react';

import { Box, CheckBox, Grommet, Text, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';

const placeProps = (name, color, showDrop) => ({
  name,
  color,
  ...(showDrop
    ? {
        content: (
          <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
            <Text>{name}</Text>
          </Box>
        ),
        dropProps: {
          align: { left: 'right' },
          background: { color, opacity: 'strong' },
          elevation: 'medium',
          margin: { left: 'small' },
          round: 'xsmall',
        },
      }
    : {}),
});

export const Places = () => {
  const [showDrops, setShowDrops] = React.useState(true);
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <CheckBox
          label="show"
          checked={showDrops}
          onChange={() => setShowDrops(!showDrops)}
        />
        <WorldMap
          places={[
            {
              location: [-33.8830555556, 151.216666667],
              ...placeProps('Sydney', 'graph-1', showDrops),
            },
            {
              location: [78.22, 15.65],
              ...placeProps('Svalbard', 'graph-3', showDrops),
            },
            {
              location: [64.503889, -165.399444],
              ...placeProps('Nome', 'graph-1', showDrops),
            },
            {
              location: [51.507222, -0.1275],
              ...placeProps('London', 'graph-2', showDrops),
            },
            {
              location: [-54.801944, -68.303056],
              ...placeProps('Ushuaia', 'graph-3', showDrops),
            },
            {
              location: [-0.002222, -78.455833],
              ...placeProps('Quito', 'graph-1', showDrops),
            },
          ]}
        />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/WorldMap/Places',
};
