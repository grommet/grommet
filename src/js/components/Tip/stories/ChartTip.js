import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  grommet,
  Box,
  DataChart,
  Grommet,
  Heading,
  List,
  Text,
  Tip,
} from 'grommet';
import { deepMerge } from 'grommet/utils';

const theme = deepMerge(grommet, {
  list: {
    item: {
      pad: { horizontal: 'medium', vertical: 'xsmall' },
      background: 'grey',
      border: false,
      extend: `color: white;`,
    },
  },
});

const chartData = [];
for (let i = 1; i < 8; i += 1) {
  const v = Math.sin(i / 2.0);
  chartData.push({
    percent: Math.abs(v * 100),
  });
}

const listData = [
  { entry: '29,892 IO/sec', action: 'Read' },
  { entry: '0.3ms', action: 'Latency' },
  { entry: 'Low', action: 'Potential Impact' },
];

const TipContent = () => (
  <Box direction="row" align="center" pad="large">
    <svg viewBox="0 0 30 30" version="1.1" width="22px" height="22px">
      <polygon
        fill="grey"
        points="6 0 32 12 6 29"
        transform="matrix(-1 0 0 1 36 0)"
      />
    </svg>
    <Box background="grey" round="xsmall" pad="medium" gap="large" fill>
      <Text color="white" weight="bold" alignSelf="center">
        10/12/2020 2AM MDT
      </Text>
      <List data={listData} primaryKey="action" secondaryKey="entry" />
    </Box>
  </Box>
);

const Example = () => (
  <Grommet theme={theme}>
    <Box align="center" justify="start" pad="large" gap="medium">
      <Heading size="small"> Hover the Chart </Heading>
      <Tip content={<TipContent />}>
        <DataChart data={chartData} series="percent" />
      </Tip>
    </Box>
  </Grommet>
);

storiesOf('Tip', module).add('ChartTip', () => <Example />, {
  chromatic: { disable: true },
});
