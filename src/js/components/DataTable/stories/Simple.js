import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';

import { columns, DATA } from './data';
// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js

const SimpleDataTable = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <DataTable columns={columns} data={DATA} step={10} />
    </Box>
  </Grommet>
);

storiesOf('DataTable', module).add('Simple', () => <SimpleDataTable />);
