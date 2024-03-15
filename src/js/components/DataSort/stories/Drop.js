import React from 'react';
import { Box, Data, DataSort, DataTable, Toolbar } from 'grommet';
import { columns, DATA } from '../../DataTable/stories/data';

export const Drop = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="start" pad="large" gap="medium">
    <Data data={DATA}>
      <Toolbar>
        <DataSort drop />
      </Toolbar>
      <DataTable columns={columns} />
    </Data>
  </Box>
  // </Grommet>
);

Drop.args = {
  full: true,
};

export default {
  title: 'Data/DataSort/Drop',
};
