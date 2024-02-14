import React from 'react';

import {
  Box,
  Cards,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Data,
  DataSort,
  DataSearch,
  DataFilters,
  Text,
  Toolbar,
} from 'grommet';

import { DATA } from '../../DataTable/stories/data';

const amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const Properties = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box
    align="center"
    fill="horizontal"
    justify="start"
    pad="xlarge"
    gap="medium"
  >
    <Data
      data={DATA}
      updateOn="change"
      properties={{
        location: {
          sort: false,
          label: 'Location',
          options: ['Fort Collins', 'Palo Alto', 'Boise', 'San Francisco'],
        },
        name: {
          filter: false,
        },
        paid: {
          search: false,
          filter: false,
        },
      }}
      fill="horizontal"
    >
      <Box gap="medium">
        <Toolbar>
          <DataSearch />
          <DataSort drop />
          <DataFilters drop />
        </Toolbar>
        <Cards size="medium">
          {(item) => (
            <Card key={item.name} pad="small">
              <CardBody>
                <Heading level={2} size="small" margin="none">
                  {item.name}
                </Heading>
                <Text>{amountFormatter.format(item.paid / 100)}</Text>
              </CardBody>
              <CardFooter>{item.location}</CardFooter>
            </Card>
          )}
        </Cards>
      </Box>
    </Data>
  </Box>
  // </Grommet>
);

Properties.args = {
  full: true,
};

export default {
  title: 'Data/Data/Properties',
};
