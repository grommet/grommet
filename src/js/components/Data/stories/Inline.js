import React, { useContext } from 'react';

import {
  Box,
  DataFilters,
  DataFilter,
  DataSearch,
  DataSummary,
  DataTable,
  Grid,
  Heading,
  ResponsiveContext,
  Toolbar,
} from 'grommet';

import { Data } from '../Data';
import { columns, DATA } from '../../DataTable/stories/data';

export const Inline = () => {
  const size = useContext(ResponsiveContext);

  const Filters = ({ search, ...rest }) => (
    <DataFilters {...rest}>
      {search && <DataSearch />}
      <DataFilter property="location" />
      <DataFilter property="percent" />
    </DataFilters>
  );

  let toolbar;
  let sidebar;
  if (size === 'small' || size === 'xsmall') {
    toolbar = (
      <Toolbar key="tool">
        <Box direction="row" gap="xsmall">
          <DataSearch />
          <Filters drop />
        </Box>
      </Toolbar>
    );
  } else {
    sidebar = <Filters search />;
  }

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Data data={DATA} onChange={sidebar ? true : undefined}>
      <Grid
        columns={sidebar ? ['auto', ['medium', 'large']] : 'auto'}
        gap="large"
        pad="large"
        justifyContent="center"
      >
        {sidebar}
        <Box flex={false}>
          <Heading size="small" margin="none">
            People
          </Heading>
          {toolbar}
          <DataSummary />
          <Box flex={false}>
            <DataTable columns={columns} />
          </Box>
        </Box>
      </Grid>
    </Data>
    // </Grommet>
  );
};

Inline.args = {
  full: true,
};

export default {
  title: 'Layout/Data/Inline',
};
