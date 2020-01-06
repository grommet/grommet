import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, DataTable } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

import { columns, DATA } from './data';

const StyledDataTable = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" pad="large">
      <DataTable
        columns={columns}
        data={DATA}
        step={10}
        pad={{ horizontal: 'large', vertical: 'medium' }}
        background={{
          header: 'dark-3',
          body: ['light-1', 'light-3'],
          footer: 'dark-3',
        }}
        border={{ body: 'bottom' }}
        rowProps={{ Eric: { background: 'accent-2', pad: 'large' } }}
      />
    </Box>
  </MnetUIBase>
);

storiesOf('DataTable', module).add('Styled', () => <StyledDataTable />);
