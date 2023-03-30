import React from 'react';

import { Box, Data, Notification } from 'grommet';

import { DataFilter } from '../DataFilter';
import { DATA } from '../../DataTable/stories/data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="start" pad="large" gap="medium">
    <Notification
      status="info"
      message="Data is in 'beta'. The API surface is subject to change."
    />
    <Data data={DATA}>
      <DataFilter property="location" />
    </Data>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Data/DataFilter/Simple',
};
