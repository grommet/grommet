import React from 'react';

import {
  Card,
  CardBody,
  CardFooter,
  Cards,
  DataFilters,
  DataFilter,
  DataSearch,
  DataSummary,
  Grid,
  Heading,
  Notification,
  Toolbar,
} from 'grommet';

import { Data } from '../Data';
import { DATA } from '../../DataTable/stories/data';

export const Example = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Grid
    flex={false}
    pad="large"
    columns={[['small', 'xlarge']]}
    justifyContent="center"
    gap="large"
  >
    <Notification
      status="info"
      message="Data is in 'beta'. The API surface is subject to change."
    />
    <Data data={DATA}>
      <Toolbar>
        <DataSearch />
        <DataFilters drop>
          <DataFilter property="location" />
        </DataFilters>
      </Toolbar>
      <DataSummary />
      <Cards>
        {(item) => (
          <Card key={item.name} pad="small">
            <CardBody>
              <Heading level={2} size="small" margin="none">
                {item.name}
              </Heading>
            </CardBody>
            <CardFooter>{item.location}</CardFooter>
          </Card>
        )}
      </Cards>
    </Data>
  </Grid>
  // </Grommet>
);

Example.storyName = 'Cards';

Example.args = {
  full: true,
};

export default {
  title: 'Data/Data/Cards',
};
