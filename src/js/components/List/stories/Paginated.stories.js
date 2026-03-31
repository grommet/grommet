import React from 'react';

import { Box, List, Menu } from 'grommet';
import { More } from 'grommet-icons';

const data = [];

for (let i = 0; i < 95; i += 1) {
  data.push({
    entry: `entry-${i + 1}`,
  });
}

export const Paginated = () => (
  <Box pad="medium">
    <List
      data={data}
      action={(item, index) => (
        <Menu
          key={index}
          icon={<More />}
          hoverIndicator
          items={[{ label: 'one' }]}
        />
      )}
      step={3}
      show={{ page: 7 }}
      paginate
    />
  </Box>
);

export default {
  title: 'Visualizations/List/Paginated',
};
