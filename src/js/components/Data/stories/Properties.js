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
import { DataSummary } from '../../DataSummary';

const amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const Properties = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="large">
    <Data
      data={DATA}
      properties={{
        location: {
          label: 'Location',
          sort: false,
          options: ['Fort Collins', 'Palo Alto', 'Boise', 'San Francisco'],
        },
        name: {
          filter: false,
        },
        paid: {
          search: false,
          label: 'Paid',
        },
        percent: {
          search: false,
          label: 'Percent',
        },
        date: {
          label: 'Date',
        },
      }}
    >
      <Toolbar>
        <DataSearch />
        <DataSort drop />
        <DataFilters layer />
      </Toolbar>
      <DataSummary />
      <Cards size="medium">
        {(item) => (
          <Card key={item.name} pad="small">
            <CardBody>
              <Heading level={2} margin="none">
                {item.name}
              </Heading>
              <Text>{amountFormatter.format(item.paid / 100)}</Text>
            </CardBody>
            <CardFooter>{item.location || '--'}</CardFooter>
          </Card>
        )}
      </Cards>
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
