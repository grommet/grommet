import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';

import { columns, data } from './data';

const SizedDataTable = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <DataTable columns={columns} data={data} size="medium" />
    </Box>
  </Grommet>
);

storiesOf('DataTable', module).add('Sized', () => <SizedDataTable />);
