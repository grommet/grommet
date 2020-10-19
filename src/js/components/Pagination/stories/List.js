import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, List, Menu } from 'grommet';
import { grommet } from 'grommet/themes';
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
    <Box pad="small">
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
        itemsPerPage={10}
        paginate
        paginationProps={{
          border: { side: 'top', color: 'border' },
          pad: { top: 'small' },
          // justify: 'center',
          //   defaultPage: 1,
        }}
      />
    </Box>
  </Grommet>
);

storiesOf('Pagination', module).add('List', () => <PaginatedList />);
