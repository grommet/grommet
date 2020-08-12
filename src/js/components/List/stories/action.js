import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, List, Menu } from 'grommet';
import { More } from 'grommet-icons';
import { grommet } from 'grommet/themes';

const data = [];

for (let i = 0; i < 40; i += 1) {
  data.push({
    entry: `entry-${i + 1}`,
  });
}

const ActionList = () => (
  <Grommet theme={grommet}>
    <Box pad="large">
      <List
        data={data.slice(0, 10)}
        pad={{ left: 'small', right: 'none' }}
        action={(item, index) => {
          return (
            <Menu
              key={index}
              icon={<More />}
              hoverIndicator
              items={[{ label: 'one' }]}
            />
          );
        }}
      />
    </Box>
  </Grommet>
);

storiesOf('List', module).add('action', () => <ActionList />);
