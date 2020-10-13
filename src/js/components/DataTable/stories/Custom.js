import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, DataTable } from 'grommet';
import { Blank } from 'grommet-icons';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';

const SortableIcon = () => (
  <Blank color="text-xweak" opacity="0.5">
    <g fill="none" stroke="#000" strokeWidth="2">
      <path d="M 6 10 L 12 6 L 18 10" />
      <path d="M 6 14 L 12 18 L 18 14" />
    </g>
  </Blank>
);

const customTheme = {
  global: {
    font: {
      family: 'Helvetica',
    },
  },
  dataTable: {
    header: {
      extend: ({ column, sort, sortable }) => {
        if (sortable && sort && sort.property !== column) {
          return `
          svg {
            opacity: 50%;
          }
          :hover {
            svg {
              opacity: 100%;
            }
          }
        `;
        }
        return null;
      },
    },
    icons: {
      sortable: SortableIcon,
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
