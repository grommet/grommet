import React from 'react';
import { Box, Data, DataTable, DataView } from 'grommet';
import { DATA, columns } from '../../DataTable/stories/data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="start" pad="large" gap="medium">
    <Data
      data={DATA}
      views={[
        { name: 'latest', sort: { property: 'date', direction: 'desc' } },
        { name: 'behind', properties: { percent: { min: 0, max: 30 } } },
      ]}
    >
      <DataView />
      <DataTable columns={columns} />
    </Data>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Data/DataView/Simple',
};
