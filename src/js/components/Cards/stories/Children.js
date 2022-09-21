import React from 'react';
import { Box, Card, CardBody, CardFooter, Heading } from 'grommet';
import { Cards } from '../Cards';

const data = [
  { city: 'Boise', state: 'Idaho' },
  { city: 'Fort Collins', state: 'Colorado' },
  { city: 'Bay Area', state: 'California' },
  { city: 'San Diego', state: 'California' },
];

export const Children = () => (
  <Box pad="large">
    <Cards data={data} pad="medium" border={false}>
      {(datum) => (
        <Card>
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
  title: 'Visualizations/Cards/Children',
};
