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
              location: [9.933333, -84.083333],
              ...placeProps('San José', 'graph-2', showDrops),
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
