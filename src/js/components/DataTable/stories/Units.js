import React from 'react';

import { Box, DataTable, Heading } from 'grommet';

const DATA = [
  {
    name: 'Boot',
    free: 24,
    size: 4,
  },
  {
    name: 'Backup',
    free: 30,
    size: 12,
  },
  {
    name: 'Application',
    free: 40,
    size: 23,
  },
];

const columns = [
  { property: 'name', header: 'Disk Name', size: 'small' },
  {
    property: 'size',
    header: 'Size',
    size: 'xsmall',
    align: 'end',
    units: '(TiB)',
  },
  {
    property: 'free',
    header: 'Free',
    size: 'xsmall',
    align: 'end',
    units: '%',
  },
];

const SORTABLE_DATA = [
  {
    last: 'Lullaby',
    first: 'Julius',
    count: '7',
    percentUsed: '79.3',
    consumption: '651',
  },
  {
    last: 'Rhodes',
    first: 'Fender',
    count: '5',
    percentUsed: '22.5',
    consumption: '37',
  },
];

const sortableColumns = [
  {
    property: 'last',
    header: 'Last',
  },
  {
    property: 'first',
    header: 'First',
  },
  {
    property: 'count',
    header: 'Count',
    align: 'end',
  },
  {
    property: 'percentUsed',
    header: 'Percent Used',
    align: 'end',
    units: '%',
  },
  {
    property: 'consumption',
    header: 'Consumption',
    align: 'end',
    units: 'TiB',
  },
];

export const UnitsDataTable = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center">
    <Heading level="3">Table with units in the heading</Heading>
    <DataTable columns={columns} data={DATA} primaryKey={false} />
    <Heading level="3">Sortable with units in the heading</Heading>
    <DataTable sortable columns={sortableColumns} data={SORTABLE_DATA} />
  </Box>
  // </Grommet>
);

UnitsDataTable.storyName = 'Units';

export default {
  title: 'Visualizations/DataTable/Units',
};
