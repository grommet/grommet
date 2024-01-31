import React from 'react';

import { Data, DataSummary, DataTable, Grid, Paragraph } from 'grommet';

import { DataSearch } from '../DataSearch';
import { columns, DATA } from '../../DataTable/stories/data';

export const UpdateOnSubmit = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Grid pad="large" columns={[['medium', 'large']]} justifyContent="center">
    <Paragraph color="text-weak">
      Note: Results are filtered once you hit enter.
    </Paragraph>
    <Data data={DATA}>
      <DataSearch updateOn="submit" />
      <DataSummary />
      <DataTable columns={columns} />
    </Data>
  </Grid>
  // </Grommet>
);

UpdateOnSubmit.args = {
  full: true,
};

export default {
  title: 'Data/DataSearch/UpdateOnSubmit',
};
