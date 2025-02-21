import React from 'react';

import { Box, WorldMap } from 'grommet';

export const Continents = () => {
  const [active, setActive] = React.useState();
  return (
    <Box align="center" pad="large">
      <WorldMap
        continents={[
          {
            name: 'Africa',
            color: 'graph-1',
            onClick: () => setActive(!active),
          },
        ]}
      />
      {active && <Box margin="large">Africa</Box>}
    </Box>
  );
};

export default {
  title: 'Visualizations/WorldMap/Continents',
};
