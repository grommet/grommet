import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, DataTable } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

// Source code for the data can be found here
// https://github.com/grommet/mnet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';

const Example = () => {
  const [sort, setSort] = React.useState({
    property: 'name',
    direction: 'desc',
  });
  return (
    <MnetUIBase theme={mnet}>
      <Box align="center" pad="large">
        <DataTable
          columns={columns.map(c => ({
            ...c,
            search: c.property === 'name' || c.property === 'location',
          }))}
          data={DATA}
          sort={sort}
          onSort={setSort}
          resizeable
        />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('DataTable', module).add('Sort', () => <Example />);
