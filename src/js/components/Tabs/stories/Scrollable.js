import React from 'react';

import { Box, Heading, Tab, Tabs } from 'grommet';
import { TreeOption } from 'grommet-icons';

const ScrollableTabs = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill>
    <Tabs flex>
      <Tab title="Tab 1">
        <Box
          fill
          overflow="auto"
          pad="xlarge"
          align="center"
          background="accent-1"
        >
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
          <Heading>hello!</Heading>
        </Box>
      </Tab>
      <Tab title="Tab 2">
        <Box margin="small" pad="large" align="center" background="accent-2">
          <TreeOption size="xlarge" />
        </Box>
      </Tab>
    </Tabs>
  </Box>
  // </Grommet>
);

export const Scrollable = () => <ScrollableTabs />;

Scrollable.args = {
  full: true,
};

export default {
  title: 'Controls/Tabs/Scrollable',
};
