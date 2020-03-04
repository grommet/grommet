import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DataTable, Anchor } from 'grommet';
import { grommet } from 'grommet/themes';

import { columns, data } from './data';

const SizedDataTable = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <DataTable columns={columns} data={data} size="medium" />
      <Anchor
        margin={{ top: 'medium' }}
        alignSelf="center"
        href="https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js"
        label="Data used for storybook example"
      />
    </Box>
  </Grommet>
);

storiesOf('DataTable', module).add('Sized', () => <SizedDataTable />);
