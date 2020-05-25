import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataTable } from 'mnet-ui-base';

import { columns, data } from './data';

const SizedDataTable = () => (
  <>
    <Box align="center" pad="large">
      <DataTable columns={columns} data={data} size="medium" />
    </Box>
  </>
);

storiesOf('DataTable', module).add('Sized', () => <SizedDataTable />);
