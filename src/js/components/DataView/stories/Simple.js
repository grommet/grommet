import React from 'react';

import { Box, Data } from 'grommet';

import { DataView } from '../DataView';
import { DATA } from '../../DataTable/stories/data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large">
    <Data
      data={DATA}
      views={[
        { name: 'latest', sort: { property: 'date', direction: 'desc' } },
        { name: 'behind', properties: { percent: { min: 0, max: 30 } } },
      ]}
    >
      <DataView />
    </Data>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Layout/Data/DataView/Simple',
};
