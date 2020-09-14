import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, data } from './data';

const pinnedColumns = columns.map(c => ({ ...c }));
pinnedColumns[0].pin = true;

const myTheme = deepMerge(grommet, {
  table: {
    header: {
      background: {
        color: 'background',
      },
    },
    footer: {
      background: {
        color: 'background-back',
      },
    },
  },
});

const Example = () => (
  <Grommet theme={myTheme} full>
    <Box fill="vertical">
      <DataTable
        columns={pinnedColumns}
        data={data}
        step={10}
        fill
        pin
        background={{
          pinned: { color: 'light-2' },
        }}
      />
    </Box>
  </Grommet>
);

storiesOf('DataTable', module).add('Fill and pin', () => <Example />);
