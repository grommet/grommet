import React from 'react';

import { Box, DataTable } from 'grommet';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';

export const VerticalAlign = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" pad="large">
    <DataTable
      columns={[
        {
          property: 'large',
          header: 'This header name is long and wraps',
          render: () => 'This content is long and wraps a lot too.',
          size: 'small',
          footer: 'This footer content is long and wraps.',
        },
        ...columns,
      ]}
      data={DATA}
      step={10}
      verticalAlign={{
        header: 'bottom',
        body: 'top',
        footer: 'top',
      }}
    />
  </Box>
  // </Grommet>
);

VerticalAlign.storyName = 'Vertical Align';

export default {
  title: 'Visualizations/DataTable/Vertical Align',
};
