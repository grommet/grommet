import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, DataTable } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

import { columns, DATA } from './data';

const groupColumns = [...columns];
const first = groupColumns[0];
groupColumns[0] = { ...groupColumns[1] };
groupColumns[1] = { ...first };
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;

const GroupedDataTable = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" pad="large">
      <DataTable
        columns={groupColumns}
        data={DATA}
        groupBy="location"
        sortable
      />
    </Box>
  </MnetUIBase>
);

storiesOf('DataTable', module).add('Grouped', () => <GroupedDataTable />);
