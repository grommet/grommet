import React from 'react';
import { storiesOf } from '@storybook/react';
import { TreeOption } from 'grommet-icons';
import { Box, Heading, Tab, Tabs } from 'mnet-ui-base';

const ScrollableTabs = () => (
  <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
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
  </div>
);

storiesOf('Tabs', module).add('Scrollable', () => <ScrollableTabs />);
