import React from 'react';

import {
  Box,
  Grid,
  Text,
  Selector,
  SelectorGroup,
  SelectorIndicator,
} from 'grommet';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="large" gap="large">
    {/* you will still pass multiple, value, onSelect here */}
    <SelectorGroup>
      <Grid
        columns={{
          count: 3,
          size: ['auto', 'medium'],
        }}
        gap="small"
        role="group"
      >
        <Selector>
          {({ selected }) => (
            <Box
              // TODO use selected to change color of border
              border={{
                color: selected ? 'brand' : 'border',
              }}
              overflow="hidden"
              round="xsmall"
              fill
            >
              <Box pad="small" direction="row" justify="between">
                <Text weight={500}>Require service assignments</Text>
                <SelectorIndicator />
              </Box>
              <Box cssGap pad="small" flex>
                <Text size="large">24</Text>
              </Box>
            </Box>
          )}
        </Selector>
        <Selector>
          <Box
            // TODO use selected to change color of border
            border={{
              color: 'border',
            }}
            overflow="hidden"
            round="xsmall"
            fill
          >
            <Box pad="small" direction="row" justify="between">
              <Text weight={500}>Expired subscriptions</Text>
              <SelectorIndicator />
            </Box>
            <Box cssGap pad="small" flex>
              <Text size="large">18</Text>
            </Box>
          </Box>
        </Selector>
        <Selector>
          <Box
            // TODO use selected to change color of border
            border={{
              color: 'border',
            }}
            overflow="hidden"
            round="xsmall"
            fill
          >
            <Box pad="small" direction="row" justify="between">
              <Text weight={500}>Needs attention</Text>
              <SelectorIndicator />
            </Box>
            <Box cssGap pad="small" flex>
              <Text size="large">9</Text>
            </Box>
          </Box>
        </Selector>
      </Grid>
    </SelectorGroup>
    <SelectorGroup multiple>
      <Grid
        columns={{
          count: 3,
          size: ['auto', 'medium'],
        }}
        gap="small"
        role="group"
      >
        <Selector>
          <Box
            // TODO use selected to change color of border
            border={{
              color: 'border',
            }}
            overflow="hidden"
            round="xsmall"
            fill
          >
            <Box pad="small" direction="row" justify="between">
              <Text weight={500}>Require service assignments</Text>
              <SelectorIndicator />
            </Box>
            <Box cssGap pad="small" flex>
              <Text size="large">24</Text>
            </Box>
          </Box>
        </Selector>
        <Selector>
          <Box
            // TODO use selected to change color of border
            border={{
              color: 'border',
            }}
            overflow="hidden"
            round="xsmall"
            fill
          >
            <Box pad="small" direction="row" justify="between">
              <Text weight={500}>Expired subscriptions</Text>
              <SelectorIndicator />
            </Box>
            <Box cssGap pad="small" flex>
              <Text size="large">18</Text>
            </Box>
          </Box>
        </Selector>
        <Selector>
          <Box
            // TODO use selected to change color of border
            border={{
              color: 'border',
            }}
            overflow="hidden"
            round="xsmall"
            fill
          >
            <Box pad="small" direction="row" justify="between">
              <Text weight={500}>Needs attention</Text>
              <SelectorIndicator />
            </Box>
            <Box cssGap pad="small" flex>
              <Text size="large">9</Text>
            </Box>
          </Box>
        </Selector>
      </Grid>
    </SelectorGroup>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Controls/SelectorGroup/Simple',
};
