import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';

import { columns, DATA } from './data';

const TunableDataTable = () => (
  <Grommet theme={grommet}>
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
  </Grommet>
);

storiesOf('DataTable', module).add('Tunable', () => <TunableDataTable />);
