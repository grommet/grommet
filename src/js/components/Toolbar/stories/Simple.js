import React from 'react';

import { Box, Button, DropButton, TextInput } from 'grommet';
import { Search } from 'grommet-icons/icons/Search';
import { Filter } from 'grommet-icons/icons/Filter';

import { Toolbar } from '../Toolbar';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large">
    <Toolbar>
      <TextInput icon={<Search />} />
      <DropButton kind="toolbar" icon={<Filter />} />
      <Box flex />
      <Button label="Create" primary />
    </Toolbar>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Layout/Toolbar/Simple',
};
