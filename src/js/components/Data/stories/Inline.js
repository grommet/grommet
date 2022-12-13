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

const sizes = ['small', 'medium', 'large'];

const DATA = [];

for (let i = 0; i < 2; i += 1) {
  DATA.push({
    id: `x-${i}`,
    sub: {
      name: `Name ${i + 1}`,
    },
    size: sizes[i % sizes.length],
    date: `2022-12-${(i % 30) + 1}`,
  });
}

const Filters = ({ search, ...rest }) => (
  <DataFilters {...rest}>
    {search && <DataSearch property="sub.name" />}
    <DataFilter property="size" />
  </DataFilters>
);

export const Inline = () => {
  const size = useContext(ResponsiveContext);

  let toolbar;
  let sidebar;
  if (size === 'small' || size === 'xsmall') {
    toolbar = (
      <Toolbar key="tool">
        <Box direction="row" gap="xsmall">
          <DataSearch property="sub.name" />
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
    <Data
      properties={{
        'sub.name': { label: 'Name' },
        size: { label: 'Size' },
        date: { label: 'Date' },
      }}
      data={DATA}
      updateOn={sidebar ? 'change' : undefined}
    >
      <Grid
        columns={sidebar ? ['auto', ['small', 'large']] : 'auto'}
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
            <DataTable />
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
