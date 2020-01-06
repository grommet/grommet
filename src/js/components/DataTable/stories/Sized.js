import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, DataTable } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

import { columns, data } from './data';

const SizedDataTable = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" pad="large">
      <DataTable columns={columns} data={data} size="medium" />
    </Box>
  </MnetUIBase>
);

storiesOf('DataTable', module).add('Sized', () => <SizedDataTable />);
