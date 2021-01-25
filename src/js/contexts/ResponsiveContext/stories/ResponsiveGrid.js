import React from 'react';

import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet/themes';

import { Box, Grid, Paragraph, Grommet, ResponsiveContext } from 'grommet';

const customBreakpoints = deepMerge(grommet, {
  global: {
    breakpoints: {
      xsmall: {
        value: 500,
      },
      small: {
        value: 900,
      },
      medium: undefined,
      middle: {
        value: 3000,
      },
    },
  },
});

const ResponsiveGrid = ({ children, areas, ...props }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Grid areas={areas[size]} {...props}>
      {children}
    </Grid>
  );
};

export const ResponsiveGridExample = () => (
  <Grommet theme={customBreakpoints} full>
    <ResponsiveGrid
      columns={['25%', '25%', '25%', '25%']}
      rows={['3em', '3em', '3em']}
      areas={{
        xsmall: [
          { name: 'header', start: [0, 0], end: [3, 0] },
          { name: 'one', start: [0, 1], end: [1, 1] },
          { name: 'two', start: [2, 1], end: [3, 1] },
          { name: 'three', start: [0, 2], end: [3, 2] },
        ],
        small: [
          { name: 'header', start: [0, 0], end: [3, 0] },
          { name: 'one', start: [0, 1], end: [1, 1] },
          { name: 'two', start: [2, 1], end: [3, 1] },
          { name: 'three', start: [0, 2], end: [3, 2] },
        ],
        medium: [
          { name: 'header', start: [0, 0], end: [3, 0] },
          { name: 'one', start: [0, 1], end: [0, 1] },
          { name: 'two', start: [1, 1], end: [2, 1] },
          { name: 'three', start: [3, 1], end: [3, 1] },
        ],
        middle: [
          { name: 'header', start: [0, 0], end: [3, 0] },
          { name: 'one', start: [0, 1], end: [0, 1] },
          { name: 'two', start: [1, 1], end: [2, 1] },
          { name: 'three', start: [3, 1], end: [3, 1] },
        ],
      }}
    >
      <Box gridArea="header" background="brand" />
      <Box gridArea="one" background="dark-1" />
      <Box gridArea="two" background="dark-2" />
      <Box gridArea="three" background="dark-3" />
    </ResponsiveGrid>
    <Paragraph>
      Below a certain threshold, Columns 1 &amp; 2 switch to 50% and Column 3
      moves down to a new spot in the grid.
    </Paragraph>
  </Grommet>
);

ResponsiveGridExample.storyName = 'Responsive grid';

export default {
  title: 'Utilities/ResponsiveContext/Responsive grid',
};
