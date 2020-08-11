/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { keyframes } from 'styled-components';

import { Box, DataChart, Grommet, Stack } from 'grommet';
import { grommet } from 'grommet/themes';

export const keyFrameExampleOne = keyframes`
0% {
  width: 200px;
  background-color: #FFFFFF;
}  
100% {
    width: 0px;
    background-color: #FFFFFF;
  }
`;
const AnimatedBox = styled(Box)`
  animation: ${keyFrameExampleOne} 3s linear;
`;

const data = [];
for (let i = 0; i < 13; i += 1) {
  const v = -Math.sin(i / 2.0);
  const v2 = Math.cos(i / 2.0);
  data.push({
    date: `2020-07-${((i % 30) + 1).toString().padStart(2, 0)}`,
    amount: Math.floor(v * 100),
    need: Math.floor(v2 * 10),
  });
}

for (let i = 0; i < 13; i += 1) {
  const v = -Math.sin(i / 2.0);
  const v2 = Math.cos(i / 2.0);
  data.push({
    date: `2020-08-${((i % 30) + 1).toString().padStart(2, 0)}`,
    amountPredicted: Math.floor(v * 100),
    needPredicted: Math.floor(v2 * 10),
  });
}

const Example = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <Stack anchor="top-right" interactiveChild="first">
        <DataChart
          data={data}
          series={[
            'date',
            {
              property: 'amount',
              // color: 'graph-3',
              // Should the color prop have an impact? because it doesn't
              point: 'circle',
              label: 'Amount',
            },
            {
              property: 'need',
              color: 'graph-1', // does not have any impact
              point: 'star', // does not have any impact
              label: 'Demand',
            },
            {
              property: 'amountPredicted',
              // color: 'graph-2', // does not have any impact
              point: 'circle',
              label: 'Predicted Amount',
            },
            { property: 'needPredicted', color: 'graph-1' },
          ]}
          chart={[
            {
              property: 'amount',
              type: 'area',
              thickness: 'xsmall',
              color: { color: 'graph-3', opacity: 'medium' },
            },
            {
              property: 'amount',
              type: 'line',
              thickness: 'xsmall',
              round: true,
            },
            {
              property: 'amountPredicted',
              type: 'area',
              thickness: 'xsmall',
              color: { color: 'graph-3', opacity: 'medium' },
            },
            {
              property: 'amountPredicted',
              type: 'line',
              thickness: 'xsmall',
              round: true,
              dash: true,
            },
            {
              property: 'amountPredicted',
              type: 'point',
              thickness: 'small',
              point: 'circle', // shouldn't be here
            },
            {
              property: 'amount',
              type: 'point',
              thickness: 'small',
            },
            // {
            //   property: 'needPredicted',
            //   type: 'line',
            //   thickness: 'xxsmall',
            //   round: true,
            //   dash: true,
            // },
            {
              property: 'need',
              type: 'line',
              thickness: 'xxsmall',
              dash: true,
              round: true,
              // color: 'graph-3',
            },
            {
              property: 'need',
              type: 'point',
              thickness: 'small',
              // I would expect that enabling the following color
              // won't affect the color of the line, but it impacts both
              // the point and line.
              // color: 'graph-1',
            },
          ]}
          axis={{ x: 'date', y: { property: 'amount', granularity: 'medium' } }}
          guide={{ y: { granularity: 'fine' }, x: { granularity: 'fine' } }}
          gap="medium"
          pad="small"
          legend
          detail
        />
        {/* Start the prediction */}
        <Box
          width="small"
          height="small"
          border={[{ side: 'left', size: 'medium' }]}
          background={{ color: '#FFFFFF', opacity: 0.4 }}
        />
        <AnimatedBox width="small" height="small" />
      </Stack>
    </Box>
  </Grommet>
);

storiesOf('DataChart', module).add('Prediction', () => <Example />);
