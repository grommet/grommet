import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';

const Example = () => {
  const [sort, setSort] = React.useState({
    property: 'name',
    direction: 'desc',
  });
  return (
    <Grommet theme={grommet}>
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
    </Grommet>
  );
};

storiesOf('DataTable', module).add('Sort', () => <Example />);
