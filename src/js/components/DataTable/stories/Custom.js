import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, DataTable } from 'grommet';
import { FormNext } from 'grommet-icons';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';

const customTheme = {
  global: {
    font: {
      family: 'Helvetica',
    },
  },
  dataTable: {
    icons: {
      sortable: FormNext,
    },
  },
};

const Example = () => {
  const [sort, setSort] = React.useState({
    property: 'name',
    direction: 'desc',
  });
  return (
    <Grommet theme={customTheme}>
      <Box align="center" pad="large">
        <DataTable
          columns={columns}
          data={DATA}
          step={10}
          sort={sort}
          onSort={setSort}
        />
      </Box>
    </Grommet>
  );
};

storiesOf('DataTable', module).add('Custom', () => <Example />);
