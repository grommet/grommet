import React from 'react';

import { Attraction, Car, TreeOption } from 'grommet-icons';
import { Box, Grommet, grommet, Tab, Tabs } from 'grommet';
import { deepMerge } from 'grommet/utils';

const myTheme = deepMerge(grommet, {
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
    border: {
      side: 'bottom',
      color: 'dark-4',
    },
    pad: 'small',
    margin: {
      // bring the overall tabs border behind invidual tab borders
      vertical: '-2px',
      horizontal: 'none',
    },
  },
});

const AlignControlsTabs = () => (
  <Grommet theme={myTheme} full>
    <Tabs justify="start" alignControls="start">
      <Tab title="Tab 1">
        <Box fill pad="large" align="center">
          <Attraction size="xlarge" />
        </Box>
      </Tab>
      <Tab title="Tab 2">
        <Box fill pad="large" align="center">
          <TreeOption size="xlarge" />
        </Box>
      </Tab>
      <Tab title="Tab 3">
        <Box fill pad="large" align="center">
          <Car size="xlarge" />
        </Box>
      </Tab>
    </Tabs>
  </Grommet>
);

export const AlignControls = () => <AlignControlsTabs />;
AlignControls.storyName = 'Align controls';

export default {
  title: 'Controls/Tabs/Align controls',
};
