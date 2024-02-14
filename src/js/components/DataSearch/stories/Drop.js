import React from 'react';

import { Data, DataSummary, DataTable, Grid, Paragraph } from 'grommet';

import { DataSearch } from '../DataSearch';
import { columns, DATA } from '../../DataTable/stories/data';

export const Drop = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Grid pad="large" columns={['large']} justifyContent="center">
    <Paragraph color="text-weak">
      Note: Results are filtered as you type, checking all fields.
    </Paragraph>
    <Data data={DATA}>
      <DataSearch drop />
      <DataSummary />
      <DataTable columns={columns} />
    </Data>
  </Grid>
  // </Grommet>
);

Drop.args = {
  full: true,
};

export default {
  title: 'Data/DataSearch/Drop',
};
