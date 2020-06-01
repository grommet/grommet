import React from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction, Car, TreeOption } from 'grommet-icons';
import { Box, Grommet, Tab, Tabs } from 'grommet';
import { hpe } from 'grommet-theme-hpe-next';
import { deepMerge } from 'grommet/utils';

const myTheme = deepMerge(hpe, {
  tabs: {
    header: {
      border: {
        side: 'bottom',
        color: 'blue',
        size: 'small',
      },
    },
  },
  tab: {
    margin: {
      // bring the overall tabs border behind invidual tab borders
      vertical: '-2px',
      horizontal: 'none',
    },
  },
});

const AlignTabs = () => (
  <Grommet theme={myTheme} full>
    <Tabs justify="start">
      <Tab title="Tab 1">
        <Box fill pad="large" align="center" background="accent-1">
          <Attraction size="xlarge" />
        </Box>
      </Tab>
      <Tab title="Tab 2">
        <Box fill pad="large" align="center" background="accent-2">
          <TreeOption size="xlarge" />
        </Box>
      </Tab>
      <Tab title="Tab 3">
        <Box fill pad="large" align="center" background="accent-3">
          <Car size="xlarge" />
        </Box>
      </Tab>
    </Tabs>

    <Tabs justify="start" alignTabs="start">
      <Tab title="Tab 1">
        <Box fill pad="large" align="center" background="accent-1">
          <Attraction size="xlarge" />
        </Box>
      </Tab>
      <Tab title="Tab 2">
        <Box fill pad="large" align="center" background="accent-2">
          <TreeOption size="xlarge" />
        </Box>
      </Tab>
      <Tab title="Tab 3">
        <Box fill pad="large" align="center" background="accent-3">
          <Car size="xlarge" />
        </Box>
      </Tab>
    </Tabs>
  </Grommet>
);

storiesOf('Tabs', module).add('alignTabs', () => <AlignTabs />);
