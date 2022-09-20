import React from 'react';

import {
  Box,
  ButtonBar,
  Button,
  DropButton,
  FilterBar,
  TextInput,
} from 'grommet';
import { Search } from 'grommet-icons/icons/Search';
import { Filter } from 'grommet-icons/icons/Filter';

import { Toolbar } from '../Toolbar';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large">
    <Toolbar
      filter={
        <FilterBar>
          <TextInput icon={<Search />} />
          <DropButton kind="toolbar" icon={<Filter />} />
        </FilterBar>
      }
      actions={
        <ButtonBar>
          <Button label="Create" primary />
        </ButtonBar>
      }
    />
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Layout/Toolbar/Simple',
};
