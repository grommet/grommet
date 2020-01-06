import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, DataTable } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

import { columns, DATA } from './data';

const SimpleDataTable = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" pad="large">
      <DataTable columns={columns} data={DATA} step={10} />
    </Box>
  </MnetUIBase>
);

storiesOf('DataTable', module).add('Simple', () => <SimpleDataTable />);
