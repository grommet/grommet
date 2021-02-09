import React from 'react';

import { Box, Grommet, List, Menu } from 'grommet';
import { grommet } from 'grommet/themes';
import { More } from 'grommet-icons';

const data = [];

for (let i = 0; i < 95; i += 1) {
  data.push({
    entry: `entry-${i + 1}`,
  });
}

export const Show = () => (
  <Grommet theme={grommet} full>
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
        show={30}
      />
    </Box>
  </Grommet>
);
