import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, DataTable } from 'grommet';
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
      >
        <DataTable
          columns={columns}
          data={[...DATA]}
          step={10}
          select={select}
          onSelect={setSelect}
          paginationProps={{
            margin: { top: 'small' },
            pad: { vertical: 'small' },
            round: 'xsmall',
            step: 4,
          }}
          sortable
        />
      </Box>
      <Box
        background="background-back"
        margin="large"
        pad="small"
        round="small"
      >
        <DataTable
          columns={columns}
          data={[...DATA]}
          step={10}
          select={select}
          onSelect={setSelect}
          paginationProps={{
            // alignSelf: 'center',
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
      <Box
        background="background-back"
        margin="large"
        pad="small"
        round="small"
      >
        <DataTable
          columns={columns}
          data={[...DATA]}
          step={10}
          select={select}
          onSelect={setSelect}
          sortable
          pin
        />
      </Box>
    </Grommet>
  );
};

storiesOf('Pagination', module).add('DataTable', () => <PaginatedDataTable />);
