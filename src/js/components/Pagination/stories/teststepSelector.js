import React from 'react';

import { Box, Pagination, Data, DataTable } from 'grommet';
import { data } from '../../DataTable/stories/data';

export const Test = () => (
  <Box align="center" pad="large">
    <Data data={data} toolbar>
      <DataTable size="large" />
      <Pagination stepSelector={[2, 5, 8]} />
    </Data>
  </Box>
);

export default {
  title: 'Controls/Pagination/Test',
};
