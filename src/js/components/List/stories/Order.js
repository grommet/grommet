import React, { useState } from 'react';

import { Grommet, Box, List } from 'grommet';
import { grommet } from 'grommet/themes';

const locations = [
  'Boise',
  'Fort Collins',
  'Los Gatos',
  'Palo Alto',
  'San Francisco',
];

export const Order = () => {
  const [ordered, setOrder] = useState(locations);
  return (
    <Grommet theme={grommet} role="application">
      <Box align="center" pad="large">
        <List data={ordered} onOrder={setOrder} />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/List/Order',
};
