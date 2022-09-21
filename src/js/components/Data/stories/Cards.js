import React from 'react';

import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Cards,
  DataFilters,
  DataFilter,
  DataSearch,
  DataSummary,
  Heading,
  Toolbar,
} from 'grommet';

import { Data } from '../Data';
import { DATA } from '../../DataTable/stories/data';

export const Example = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box flex={false} fill="horizontal" pad="large">
    <Data data={DATA}>
      <Toolbar>
        <Box direction="row" gap="xsmall">
          <DataSearch />
          <DataFilters drop>
            <DataFilter property="location" />
          </DataFilters>
        </Box>
      </Toolbar>
      <DataSummary />
      <Cards>
        {(item) => (
          <Card key={item.name}>
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
  </Box>
  // </Grommet>
);

Example.storyName = 'Cards';

Example.args = {
  full: true,
};

export default {
  title: 'Layout/Data/Cards',
};
