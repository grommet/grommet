import React from 'react';

import {
  grommet,
  Box,
  Meter,
  Grommet,
  Heading,
  List,
  ResponsiveContext,
  Text,
  Tip,
} from 'grommet';
import { deepMerge } from 'grommet/utils';

const tooltipColor = 'white';

const theme = deepMerge(grommet, {
  list: {
    item: {
      pad: { horizontal: 'small', vertical: 'xsmall' },
      background: tooltipColor,
      border: false,
    },
  },
});

const listData = [
  { entry: '6.7 TB (15.6%)', action: 'Used' },
  { entry: '7.2 TB (16.8%)', action: 'Subscribed' },
  { entry: '29 TB (67.6 %)', action: 'Free' },
];

const TipContent = ({ size }) => (
  <Box direction="row" align="center" pad={size}>
    {/* Show the Caret on a large window view */}
    {size === 'large' && (
      <svg viewBox="0 0 30 30" version="1.1" width="22px" height="22px">
        <polygon
          fill={tooltipColor}
          points="6 0 32 12 6 29"
          transform="matrix(-1 0 0 1 36 0)"
        />
      </svg>
    )}
    <Box
      background={tooltipColor}
      round="xsmall"
      pad="small"
      gap={size !== 'small' ? 'medium' : 'small'}
      fill
    >
      <Text
        weight="bold"
        alignSelf="center"
        size={size === 'small' ? 'xsmall' : 'small'}
      >
        10/12/2020 2AM MDT
      </Text>
      <Box direction="row-responsive">
        {/* Don't show the Legend on a small view */}
        {size !== 'small' && (
          <Box gap="small" pad={{ vertical: 'xsmall' }} responsive={false}>
            <Box pad="10px" background="graph-0" />
            <Box pad="10px" background="graph-1" />
            <Box pad="10px" background="graph-2" />
          </Box>
        )}
        <List data={listData} primaryKey="action" secondaryKey="entry">
          {(datum, index) => (
            <Box
              gap="medium"
              direction="row"
              align="center"
              justify="between"
              key={index}
            >
              <Text
                size="small"
                weight="bold"
                color={size !== 'small' ? undefined : `graph-${index}`}
              >
                {datum.action}
              </Text>
              <Text
                size="small"
                weight="bold"
                color={size !== 'small' ? undefined : `graph-${index}`}
              >
                {datum.entry}
              </Text>
            </Box>
          )}
        </List>
      </Box>
    </Box>
  </Box>
);

export const ResponsiveTip = () => (
  <Grommet theme={theme} full>
    <ResponsiveContext.Consumer>
      {(size) => (
        <Box
          pad="large"
          gap="medium"
          background="light-4"
          height={{ min: '100%' }}
        >
          <Heading size="small" level={3}>
            Hover the Meter and play with the window size
          </Heading>
          <Text>window size: {size}</Text>
          <Tip
            content={<TipContent size={size} />}
            dropProps={{ align: { left: 'right' }, overflow: 'visible' }}
            plain
          >
            <Meter
              type="circle"
              thickness="large"
              size="small"
              values={[{ value: 67.6 }, { value: 16.8 }, { value: 15.6 }]}
            />
          </Tip>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  </Grommet>
);

ResponsiveTip.storyName = 'Responsive';

ResponsiveTip.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Tip/Custom Themed/Responsive',
};
