import React, { useState } from 'react';

import { Box, List } from 'grommet';

const locations = [
  'Boise',
  'Fort Collins',
  'Los Gatos',
  'Palo Alto',
  'San Francisco',
];

const pinnedLocations = ['Fort Collins', 'Palo Alto'];

export const Pinned = () => {
  const [ordered, setOrder] = useState(locations);
  return (
    <Box align="center" pad="large">
      <List data={ordered} onOrder={setOrder} pinned={pinnedLocations} />
    </Box>
  );
};

export default {
  title: 'Visualizations/List/Pinned',
};
