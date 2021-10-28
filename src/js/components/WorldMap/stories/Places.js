import React from 'react';

import { Box, CheckBox, Text, WorldMap } from 'grommet';

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
            location: [42.358056, -71.063611],
            ...placeProps('Boston', 'graph-2', showDrops),
          },
          {
            location: [51.507222, -0.1275],
            ...placeProps('London', 'graph-3', showDrops),
          },
          {
            location: [-0.002222, -78.455833],
            ...placeProps('Quito', 'graph-1', showDrops),
          },
          {
            location: [34.05, -118.25],
            ...placeProps('Los Angeles', 'graph-2', showDrops),
          },
          {
            location: [35.689722, 139.692222],
            ...placeProps('Tokyo', 'graph-3', showDrops),
          },
          {
            location: [78.22, 15.65],
            ...placeProps('Svalbard', 'graph-1', showDrops),
          },
          {
            location: [-54.801944, -68.303056],
            ...placeProps('Ushuaia', 'graph-2', showDrops),
          },
        ]}
      />
    </Box>
  );
};

export default {
  title: 'Visualizations/WorldMap/Places',
};
