import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, DataTable, Text } from 'grommet';
// import { grommet } from 'grommet/themes';
import { hpe } from 'grommet-theme-hpe';
import { columns, DATA } from '../../DataTable/stories/data';

const PaginatedDataTable = () => {
  const [select, setSelect] = React.useState([]);
  return (
    <Grommet theme={hpe}>
      <Box
        background="background-back"
        margin="large"
        pad="small"
        round="small"
        gap="medium"
      >
        <Text weight="bold">
          Props: `paginate` + `step=3` + `show=5` (refers to which item index to
          show)
        </Text>
        <DataTable
          columns={columns}
          data={[...DATA]}
          show={5}
          step={3}
          select={select}
          onSelect={setSelect}
          paginate
          sortable
        />
      </Box>
      <Box
        background="background-back"
        margin="large"
        pad="small"
        round="small"
        gap="medium"
      >
        <Text weight="bold">
          Props: `paginate` + `step=2` + `show= page: 3`
        </Text>
        <DataTable
          columns={columns}
          data={[...DATA]}
          show={{ page: 3 }}
          step={2}
          select={select}
          onSelect={setSelect}
          paginate
          sortable
        />
      </Box>
      <Box
        background="background-back"
        margin="large"
        pad="small"
        round="small"
        gap="medium"
      >
        <Text weight="bold">paginationProps</Text>
        <DataTable
          columns={columns}
          data={[...DATA]}
          step={10}
          select={select}
          onSelect={setSelect}
          paginationProps={{
            background: 'background-contrast',
            justify: 'center',
            fill: true,
            margin: { top: 'medium' },
            pad: { vertical: 'small' },
            round: 'xsmall',
            step: 7,
          }}
          sortable
        />
      </Box>
    </Grommet>
  );
};

storiesOf('Pagination', module).add('DataTable', () => <PaginatedDataTable />);
