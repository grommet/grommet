import React from 'react';

import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';

export const Places = () => {
  const [active, setActive] = React.useState();
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <WorldMap
          places={[
            {
              name: 'Sydney',
              location: [-33.8830555556, 151.216666667],
              color: 'graph-1',
              onClick: () => setActive(!active),
            },
          ]}
        />
        {active && <Box margin="large">Sydney</Box>}
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/WorldMap/Places',
};
