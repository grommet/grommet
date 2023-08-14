import React from 'react';

import { Box, Chart, Heading } from 'grommet';

const type = 'bar';
let value = 10;
const values = Array(14)
  .fill(0)
  .map((_, index) => {
    const delta = index * 3;
    value += delta % 2 ? delta : -delta;
    return [index, value];
  });

export const Layout = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box margin="medium">
    <Heading level={2}>full</Heading>
    <Box pad="medium" border alignSelf="stretch">
      <Chart type={type} values={values} size={{ width: 'full' }} round />
    </Box>

    <Heading level={2}>auto, gap</Heading>
    <Box pad="medium" border alignSelf="start">
      <Chart
        type={type}
        values={values}
        size={{ width: 'auto' }}
        gap="small"
        round
      />
    </Box>

    <Heading level={2}>default</Heading>
    <Box pad="medium" borde alignSelf="start">
      <Chart type={type} values={values} round />
    </Box>
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/Chart/Layout',
};
