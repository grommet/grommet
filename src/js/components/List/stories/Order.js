import React, { useState } from 'react';

import { Box, List } from 'grommet';

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
    <Box align="center" pad="large">
      <List aria-label="order list" data={ordered} onOrder={setOrder} />
    </Box>
  );
};

export default {
  title: 'Visualizations/List/Order',
};
