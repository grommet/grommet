import React from 'react';

import { Data, DataTable, Grid, Paragraph } from 'grommet';

import { DataSearch } from '../DataSearch';
import { columns, DATA } from '../../DataTable/stories/data';

export const Property = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Grid pad="large" columns={['large']} justifyContent="center">
    <Paragraph color="text-weak">
      Note: Results are filtered when pressing Enter, checking the name field.
    </Paragraph>
    <Data data={DATA}>
      <DataSearch property="name" />
      <DataTable columns={columns} />
    </Data>
  </Grid>
  // </Grommet>
);

Property.args = {
  full: true,
};

export default {
  title: 'Input/DataSearch/Property',
};
