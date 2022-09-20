import React from 'react';

import { Box, DropButton, TextInput } from 'grommet';
import { Search } from 'grommet-icons/icons/Search';
import { Filter } from 'grommet-icons/icons/Filter';

import { FilterBar } from '../FilterBar';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large" gap="medium">
    <FilterBar>
      <TextInput icon={<Search />} />
      <DropButton kind="toolbar" icon={<Filter />} />
    </FilterBar>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Layout/FilterBar/Simple',
};
