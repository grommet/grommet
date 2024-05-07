import React from 'react';

import {
  Box,
  Grid,
  Text,
  Selector,
  SelectorGroup,
  SelectorIndicator,
} from 'grommet';

// template to put into DS site
const SelectorContainer = ({ children, title }) => {
  return (
    <Selector>
      {({ selected }) => {
        return (
          <Box
            border={{
              color: selected ? 'brand' : 'border',
            }}
            overflow="hidden"
            round="xsmall"
            fill
          >
            <Box pad="small" direction="row" justify="between">
              <Text weight={500}>{title}</Text>
              <SelectorIndicator />
            </Box>
            {children}
          </Box>
        );
      }}
    </Selector>
  );
};

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
        <SelectorContainer title="Require service assignments">
          <Box pad="small" flex>
            <Text size="large">24</Text>
          </Box>
        </SelectorContainer>
        <SelectorContainer title="Expired subscriptions">
          <Box cssGap pad="small" flex>
            <Text size="large">18</Text>
          </Box>
        </SelectorContainer>
        <SelectorContainer title="Needs attention">
          <Box pad="small" flex>
            <Text size="large">9</Text>
          </Box>
        </SelectorContainer>
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
        <SelectorContainer title="Require service assignments">
          <Box pad="small" flex>
            <Text size="large">24</Text>
          </Box>
        </SelectorContainer>
        <SelectorContainer title="Expired subscriptions">
          <Box pad="small" flex>
            <Text size="large">18</Text>
          </Box>
        </SelectorContainer>
        <SelectorContainer title="Needs attention">
          <Box pad="small" flex>
            <Text size="large">9</Text>
          </Box>
        </SelectorContainer>
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
