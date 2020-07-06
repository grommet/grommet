import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';

const SimpleDataTable = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <DataTable
        pad={{ vertical: '100px', horizontal: '80px' }}
        // pad={{ vertical: "medium", horizontal: "small" }}
        columns={columns}
        data={DATA}
        step={10}
      />
    </Box>
  </Grommet>
);

storiesOf('DataTable', module).add('Simple', () => <SimpleDataTable />);
