import React from 'react';

import { Grid, DataTable, Notification } from 'grommet';

import { Data } from '../Data';
import { columns, DATA } from '../../DataTable/stories/data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Grid
    flex={false}
    pad="large"
    columns={[['small', 'large']]}
    justifyContent="center"
    gap="large"
  >
    <Notification
      status="info"
      message="Data is in 'beta'. The API surface is subject to change."
    />
    <Data
      data={DATA}
      views={[
        { name: 'latest', sort: { property: 'date', direction: 'desc' } },
        {
          name: 'behind',
          properties: {
            percent: { min: 0, max: 30 },
            location: ['San Francisco'],
          },
        },
      ]}
      toolbar
    >
      <DataTable columns={columns} />
    </Data>
  </Grid>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Layout/Data/Simple',
};
