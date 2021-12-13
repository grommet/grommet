import React from 'react';

import { Box, List, Menu } from 'grommet';
import { More } from 'grommet-icons';

const data = [];

for (let i = 0; i < 40; i += 1) {
  data.push({
    entry: `entry-${i + 1}`,
  });
}

export const Action = () => {
  const MenuComponent = React.useCallback(
    (index) => (
      <Menu
        key={index}
        icon={<More />}
        hoverIndicator
        items={[{ label: 'one' }]}
      />
    ),
    [],
  );
  return (
    <Box pad="large">
      <List
        data={data.slice(0, 10)}
        pad={{ left: 'small', right: 'none' }}
        action={(index) => MenuComponent(index)}
      />
    </Box>
  );
};

export default {
  title: 'Visualizations/List/Action',
};
