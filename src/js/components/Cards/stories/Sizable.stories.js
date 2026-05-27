import React from 'react';
import { Box, Card, CardBody, CardFooter, Heading } from 'grommet';
import { Cards } from '../Cards';

const data = [
  { city: 'Boise', state: 'Idaho', size: { columns: 2, rows: 1 } },
  { city: 'Fort Collins', state: 'Colorado' },
  { city: 'Bay Area', state: 'California' },
  { city: 'San Diego', state: 'California', size: { columns: 2, rows: 1 } },
  { city: 'San Francisco', state: 'California', size: { columns: 1, rows: 2 } },
  { city: 'Los Angeles', state: 'California' },
  { city: 'Portland', state: 'Oregon' },
  { city: 'Seattle', state: 'Washington' },
];

export const Sizable = () => (
  <Box fill>
    <Cards
      id="myGrid"
      data={data}
      pad="medium"
      columns={['flex', 'flex', 'flex']}
      rows="xsmall"
      sizeKey="size"
    >
      {(datum) => (
        <Card key={datum.city} pad="small" elevation="medium">
          <CardBody>
            <Heading level={2} size="small" margin="none">
              {datum.city}
            </Heading>
          </CardBody>
          <CardFooter>{datum.state}</CardFooter>
        </Card>
      )}
    </Cards>
  </Box>
);

export default {
  title: 'Visualizations/Cards/Sizable',
};
