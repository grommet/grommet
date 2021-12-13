import React from 'react';

import { Box, List, Menu } from 'grommet';
import { More } from 'grommet-icons';

const data = [];

for (let i = 0; i < 95; i += 1) {
  data.push({
    entry: `entry-${i + 1}`,
  });
}

export const Show = () => {
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
    <Box fill>
      <Box margin="large" height="small" overflow="scroll">
        <List data={data} action={MenuComponent} show={30} />
      </Box>
    </Box>
  );
};

export default {
  title: 'Visualizations/List/Show',
};
