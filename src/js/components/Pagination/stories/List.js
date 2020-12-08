import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, List, Menu, Text } from 'grommet';
// import { grommet } from 'grommet/themes';
import { hpe } from 'grommet-theme-hpe';
import { More } from 'grommet-icons';

const data = [];

for (let i = 0; i < 95; i += 1) {
  data.push({
    entry: `entry-${i + 1}`,
  });
}

const PaginatedList = () => (
  <Grommet theme={hpe}>
    <Box
      background="background-back"
      margin="large"
      pad="medium"
      round="small"
      gap="medium"
    >
      <Text weight="bold">paginate + step = 3</Text>
      <List
        data={data}
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
        step={3}
        show={12}
        paginate
      />
    </Box>
    <Box
      background="background-back"
      margin="large"
      pad="medium"
      round="small"
      gap="medium"
    >
      <Text weight="bold">paginationProps</Text>
      <List
        data={data}
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
        show={13}
        paginationProps={{
          border: { side: 'top', color: 'border' },
          show: 6,
          step: 7,
          pad: { top: 'small' },
        }}
      />
    </Box>
    <Box background="background-back" margin="large" pad="medium" round="small">
      <List
        data={data}
        pad={{ left: 'small', right: 'none', vertical: 'small' }}
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
        paginationProps
      />
    </Box>
  </Grommet>
);

storiesOf('Pagination', module).add('List', () => <PaginatedList />);
