import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataTable } from 'mnet-ui-base';

import { columns, DATA } from './data';

const SimpleDataTable = () => (
  <>
    <Box align="center" pad="large">
      <DataTable columns={columns} data={DATA} step={10} />
    </Box>
  </>
);

storiesOf('DataTable', module).add('Simple', () => <SimpleDataTable />);
