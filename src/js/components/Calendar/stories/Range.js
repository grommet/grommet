import React from 'react';

import { Box, Calendar } from 'grommet';

export const Range = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" pad="large">
    <Calendar
      dates={[['2020-04-03', '2020-04-08']]}
      range
      onSelect={(value) => {
        console.log(value);
      }}
    />
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/Calendar/Range',
};
