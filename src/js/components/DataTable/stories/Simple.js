import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DataTable, Anchor } from 'grommet';
import { grommet } from 'grommet/themes';

import { columns, DATA } from './data';

const SimpleDataTable = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <DataTable columns={columns} data={DATA} step={10} />
      <Box margin={{ top: 'medium' }} align="center">
        <Anchor
          href="https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js"
          label="Data used for storybook example"
        />
      </Box>
    </Box>
  </Grommet>
);

storiesOf('DataTable', module).add('Simple', () => <SimpleDataTable />);
