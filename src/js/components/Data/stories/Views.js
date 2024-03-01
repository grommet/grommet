import React from 'react';

import { Box, Data, DataTable } from 'grommet';
import { columns, DATA } from '../../DataTable/stories/data';

export const Views = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="large">
    <Data
      data={DATA}
      views={[
        { name: 'latest', sort: { property: 'date', direction: 'desc' } },
        {
          name: 'Bay Area behind',
          properties: {
            percent: { min: 0, max: 50 },
            location: ['San Francisco'],
          },
        },
      ]}
      toolbar
    >
      <DataTable alignSelf="start" columns={columns} />
    </Data>
  </Box>
  // </Grommet>
);

Views.args = {
  full: true,
};

export default {
  title: 'Data/Data/Views',
};
