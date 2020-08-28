import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, data } from './data';

const pinnedColumns = columns.map(c => ({ ...c }));
pinnedColumns[0].pin = true;

const Example = () => (
  <Grommet theme={grommet} full>
    <Box fill="vertical">
      <DataTable
        columns={pinnedColumns}
        data={data}
        step={10}
        fill
        pin
        background={{
          header: { color: 'background-front', opacity: 'strong' },
          footer: { color: 'background-front', opacity: 'strong' },
          pinned: { color: 'background-front', opacity: 'strong' },
        }}
      />
    </Box>
  </Grommet>
);

storiesOf('DataTable', module).add('Fill and Pin', () => <Example />);
