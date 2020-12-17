import React from 'react';

import { Box, Grommet, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';
import { columns, DATA } from './data';

export const PaginatedDataTable = () => {
  const [select, setSelect] = React.useState([]);
  return (
    <Grommet theme={grommet} full>
      <Box pad="large">
        <DataTable
          columns={columns}
          data={[...DATA]}
          onSelect={setSelect}
          select={select}
          sortable
          step={3}
          paginate={{ page: 10000 }}
        />
      </Box>
    </Grommet>
  );
};

PaginatedDataTable.story = {
  name: 'Paginate',
};
