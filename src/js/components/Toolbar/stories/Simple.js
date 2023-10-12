import React from 'react';

import { Box, Button, DropButton, Notification, TextInput } from 'grommet';
import { Search } from 'grommet-icons/icons/Search';
import { Filter } from 'grommet-icons/icons/Filter';

import { Toolbar } from '../Toolbar';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large" gap="large">
    <Notification
      status="info"
      message="Toolbar is in 'beta'. The API surface is subject to change."
    />
    <Box width="large">
      <Toolbar>
        <Box width={{ max: 'small' }}>
          <TextInput icon={<Search />} />
        </Box>
        <DropButton kind="toolbar" icon={<Filter />} />
        <Box flex />
        <Button label="Create" primary />
      </Toolbar>
    </Box>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Data/Toolbar/Simple',
};
