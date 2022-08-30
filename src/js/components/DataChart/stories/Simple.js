import React from 'react';

import { Box, DataChart } from 'grommet';

// const data = [];
// for (let i = 1; i < 8; i += 1) {
//   const v = Math.sin(i / 2.0);
//   data.push({
//     percent: Math.abs(v * 100),
//   });
// }
const data = [
  { date: "2020-08-20", amount: 2 },
  { date: "2020-08-21", amount: 47 },
  { date: "2020-08-22", amount: 33 },
];

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" justify="start" pad="large">
    {/* <DataChart data={data} series={[{ property: 'percent' }, {}]} /> */}
    <DataChart data={data} series={["date", "amount"]} />
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/DataChart/Simple',
};
