import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DataTable, Anchor } from 'grommet';
import { grommet } from 'grommet/themes';

import { columns, DATA } from './data';

const groupColumns = [...columns];
const first = groupColumns[0];
groupColumns[0] = { ...groupColumns[1] };
groupColumns[1] = { ...first };
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;

const GroupedDataTable = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <DataTable
        columns={groupColumns}
        data={DATA}
        groupBy="location"
        sortable
      />
      <Anchor
        margin={{ top: 'medium' }}
        alignSelf="center"
        href="https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js"
        label="Data used for storybook example"
      />
    </Box>
  </Grommet>
);

storiesOf('DataTable', module).add('Grouped', () => <GroupedDataTable />);
