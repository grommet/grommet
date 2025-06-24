import React, { useEffect, useState } from 'react';

import { Box, Chart, Stack, Text } from 'grommet';

import { calcs } from '../calcs';

export const Rich = () => {
  const [state, setState] = useState({ values: [], yAxis: [], xAxis: [] });

  useEffect(() => {
    // generate data as a server might
    const date = new Date(2018, 5, 9);
    let value = 12345.678;
    const averages = [];
    while (averages.length < 21) {
      averages.unshift({ date: date.toISOString(), value });
      date.setTime(date.getTime() - 1000 * 3600 * 24);
      const factor = date.getDate() % 3;
      value = factor === 0 ? value + 12.34 : value - 123.45 * factor;
    }

    // convert for displaying
    const values = averages.map((avg) => ({
      value: [new Date(avg.date).getTime(), avg.value],
    }));

    const { axis, bounds } = calcs(values, { coarseness: 5, steps: [3, 3] });
    const xAxis = axis[0].map((x) =>
      new Date(x).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    );
    const yAxis = axis[1];
    setState({ bounds, values, yAxis, xAxis });
  }, []);

  const { bounds, values, yAxis, xAxis } = state;
  const chartProps = {
    size: { width: 'medium', height: 'small' },
    bounds,
    values,
    overflow: true,
  };
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Box
        direction="row"
        justify="between"
        width="medium"
        margin={{ vertical: 'small' }}
      >
        {xAxis.map((x) => (
          <Text key={x}>{x}</Text>
        ))}
      </Box>
      <Stack guidingChild="last">
        <Box fill justify="between">
          {yAxis.map((y, index) => {
            const first = index === 0;
            const last = index === yAxis.length - 1 && !first;
            let align;
            if (first) {
              align = 'start';
            } else if (last) {
              align = 'end';
            } else {
              align = 'center';
            }
            return (
              <Box key={y} direction="row" align={align}>
                <Box pad={{ horizontal: 'small' }}>
                  <Text>{y}</Text>
                </Box>
                <Box border="top" flex />
              </Box>
            );
          })}
        </Box>
        <Chart
          {...chartProps}
          type="area"
          color={{ color: 'accent-1', opacity: 'medium' }}
          thickness="hair"
        />
        <Chart
          {...chartProps}
          type="line"
          round
          color={{ color: 'accent-3', opacity: 'strong' }}
          thickness="small"
        />
      </Stack>
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Chart/Rich',
};
