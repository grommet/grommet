import React, { useState } from 'react';

import { Box, List } from 'grommet';

const locations = [
  'Los Angelos',
  'Boise',
  'Fort Collins',
  'Los Gatos',
  'Palo Alto',
  'Pheonix',
  'San Francisco',
  'Trenton',
];

const pinnedLocations = [
  'Los Angelos',
  'Fort Collins',
  'Palo Alto',
  'Pheonix',
  'Trenton',
];

export const Pinned = () => {
  const [ordered, setOrder] = useState(locations);
  return (
    <Box align="center" pad="large">
      <List
        aria-label="pinned list"
        data={ordered}
        onOrder={setOrder}
        pinned={pinnedLocations}
      />
    </Box>
  );
};

export default {
  title: 'Visualizations/List/Pinned',
};
