import React from 'react';

import { Box, DataTable } from 'grommet';
import { columns, DATA } from '../../DataTable/stories/data';

export const TableSkeleton = () => (
  <Box align="center" pad="large" skeleton>
    <DataTable columns={columns} data={DATA} step={10} />
  </Box>
);

export default {
  title: 'Visualizations/Skeleton/TableSkeleton',
};
