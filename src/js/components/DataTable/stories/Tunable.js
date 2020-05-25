import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataTable } from 'mnet-ui-base';

import { columns, DATA } from './data';

const TunableDataTable = () => (
  <>
    <Box align="center" pad="large">
      <DataTable
        columns={columns.map(c => ({
          ...c,
          search: c.property === 'name' || c.property === 'location',
        }))}
        data={DATA}
        sortable
        resizeable
      />
    </Box>
  </>
);

storiesOf('DataTable', module).add('Tunable', () => <TunableDataTable />);
