import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, DataTable } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

// Source code for the data can be found here
// https://github.com/mnet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { DATA } from './data';

const columns = [
  { property: 'name', header: 'Name' },
  { property: 'location', header: 'Location' },
];

const Example = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" pad="large">
      <DataTable columns={columns} data={DATA} step={10} primaryKey={false} />
    </Box>
  </MnetUIBase>
);

storiesOf('DataTable', module).add('No Primary', () => <Example />);
