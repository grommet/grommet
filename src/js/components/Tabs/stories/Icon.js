import React from 'react';
import { css } from 'styled-components';

import { Attraction, Car, TreeOption } from 'grommet-icons';
import { Box, Grommet, Tab, Tabs } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(grommet, {
  tab: {
    color: 'text',
    active: {
      background: 'background-back',
    },
    hover: {
      background: 'background-back',
      color: 'control',
    },
    border: {
      side: 'bottom',
      color: 'background-back',
      active: {
        color: 'border',
      },
      hover: {
        color: 'control',
      },
    },
    pad: 'small',
    margin: 'none',
    extend: ({ theme }) => css`
      border-top-left-radius: '4px';
        /* or 'border-top-left-radius: ${theme.global.control.border.radius}' */
      border-top-right-radius: '4px';
      /* or 'border-top-right-radius: ${theme.global.control.border.radius} */
      font-weight: bold;
    `,
  },
});
const IconTabs = () => (
  <Grommet theme={customTheme} full>
    <Box pad="medium" fill>
      <Tabs flex>
        <Tab title="Tab 1" icon={<Attraction />}>
          <Box fill pad="large" align="center" background="accent-1">
            <Attraction size="xlarge" />
          </Box>
        </Tab>
        <Tab title="Tab 2" icon={<TreeOption />}>
          <Box fill pad="large" align="center" background="accent-2">
            <TreeOption size="xlarge" />
          </Box>
        </Tab>
        <Tab title="Tab 3" icon={<Car />}>
          <Box fill pad="large" align="center" background="accent-3">
            <Car size="xlarge" />
          </Box>
        </Tab>
      </Tabs>
    </Box>
  </Grommet>
);

export const Icon = () => <IconTabs />;

export default {
  title: 'Controls/Tabs/Icon',
};
