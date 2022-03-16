import React from 'react';

import { Box, Chart, Text } from 'grommet';

const LabelledChart = ({ color, label, value }) => (
  <Box flex={false} basis="xsmall" align="center" gap="small">
    <Chart
      bounds={[
        [0, 2],
        [0, 400],
      ]}
      type="bar"
      values={[{ value: [1, value] }]}
      color={color}
      round
      size={{ height: 'medium', width: 'xsmall' }}
    />
    <Box align="center">
      <Text>{label}</Text>
      <Text weight="bold">{value} TiB</Text>
    </Box>
  </Box>
);

export const LabelledCharts = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box pad="large" direction="row" gap="medium">
    <LabelledChart label="Exported" value={300} />
    <LabelledChart label="Usable" value={200} color="graph-1" />
    <LabelledChart label="Used" value={98.2} color="graph-2" />
  </Box>
  // </Grommet>
);

LabelledCharts.storyName = 'Labelled';

export default {
  title: 'Visualizations/Chart/Labelled',
};
