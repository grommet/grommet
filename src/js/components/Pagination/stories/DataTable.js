import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';
import { hpe } from 'grommet-theme-hpe';
import { columns, DATA } from '../../DataTable/stories/data';

const PaginatedDataTable = () => {
  const [select, setSelect] = React.useState([]);
  return (
    <Grommet theme={hpe}>
      <Box pad="small">
        <DataTable
          columns={columns}
          data={[...DATA]}
          step={10}
          select={select}
          onSelect={setSelect}
          itemsPerPage={5}
          paginate
          paginationProps={{
            pad: { top: 'medium' },
            justify: 'center',
          }}
          sortable
        />
      </Box>
    </Grommet>
  );
};

storiesOf('Pagination', module).add('DataTable', () => <PaginatedDataTable />);
