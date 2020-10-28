import React from 'react';

import {
  grommet,
  Box,
  Meter,
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

const listData = [
  { entry: '6.7 TB (15.6%)', action: 'Used' },
  { entry: '7.2 TB (16.8%)', action: 'Subscribed' },
  { entry: '29 TB (67.6 %)', action: 'Free' },
];

const TipContent = () => (
  <Box direction="row" align="center" pad="medium">
    <svg viewBox="0 0 30 30" version="1.1" width="22px" height="22px">
      <polygon
        fill="grey"
        points="6 0 32 12 6 29"
        transform="matrix(-1 0 0 1 36 0)"
      />
    </svg>
    <Box background="grey" round="xsmall" pad="medium" gap="medium" fill>
      <Text color="white" weight="bold" alignSelf="center">
        10/12/2020 2AM MDT
      </Text>
      <Box direction="row">
        <Box gap="small" pad="xsmall">
          <Box pad="small" background="graph-0" />
          <Box pad="small" background="graph-1" />
          <Box pad="small" background="graph-2" />
        </Box>
        <List data={listData} primaryKey="action" secondaryKey="entry" />
      </Box>
    </Box>
  </Box>
);

const Example = () => (
  <Grommet theme={theme}>
    <Box align="center" justify="start" pad="large" gap="medium">
      <Heading size="small" level={3}>
        Hover the Meter
      </Heading>
      <Tip
        content={<TipContent />}
        dropProps={{ align: { left: 'right' } }}
        plain
      >
        <Box>
          <Meter
            type="circle"
            thickness="large"
            size="small"
            values={[{ value: 67.6 }, { value: 16.8 }, { value: 15.6 }]}
          />
        </Box>
      </Tip>
    </Box>
  </Grommet>
);

export const MeterTip = () => <Example />;
MeterTip.parameters = { chromatic: { disable: true } };
