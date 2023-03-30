import React from 'react';
import { Card, CardBody, CardFooter, Grid, Heading } from 'grommet';
import { Cards } from '../Cards';

const data = [
  { city: 'Boise', state: 'Idaho' },
  { city: 'Fort Collins', state: 'Colorado' },
  { city: 'Bay Area', state: 'California' },
  { city: 'San Diego', state: 'California' },
  { city: 'San Francisco', state: 'California' },
];

export const Children = () => (
  <Grid pad="large" columns={[['medium', 'large']]} justifyContent="center">
    <Cards data={data} pad="medium" border={false}>
      {(datum) => (
        <Card key={datum.city} as="li">
          <CardBody>
            <Heading level={2} size="small" margin="none">
              {datum.city}
            </Heading>
          </CardBody>
          <CardFooter>{datum.state}</CardFooter>
        </Card>
      )}
    </Cards>
  </Grid>
);

export default {
  title: 'Visualizations/Cards/Children',
};
