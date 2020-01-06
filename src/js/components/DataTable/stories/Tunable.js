import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, DataTable } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

import { columns, DATA } from './data';

const TunableDataTable = () => (
  <MnetUIBase theme={mnet}>
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
  </MnetUIBase>
);

storiesOf('DataTable', module).add('Tunable', () => <TunableDataTable />);
