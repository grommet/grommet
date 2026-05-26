import React from 'react';
import { Box, Card, CardBody, CardFooter, Heading } from 'grommet';
import { Cards } from '../Cards';

const data = [
  { city: 'Boise', state: 'Idaho' },
  { city: 'Fort Collins', state: 'Colorado' },
  { city: 'Bay Area', state: 'California' },
  { city: 'San Diego', state: 'California' },
  { city: 'San Francisco', state: 'California' },
  { city: 'Los Angeles', state: 'California' },
  { city: 'Portland', state: 'Oregon' },
  { city: 'Seattle', state: 'Washington' },
];

export const OnOrder = () => {
  const [orderedData, setOrderedData] = React.useState(data);
  return (
    <Box fill>
      <Cards
        id="myGrid"
        data={orderedData}
        pad="medium"
        columns={['flex', 'flex', 'flex']}
        onOrder={setOrderedData}
      >
        {(datum) => (
          <Card key={datum.city} elevation="medium" as="li">
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
};

OnOrder.storyName = 'onOrder';

export default {
  title: 'Visualizations/Cards/onOrder',
};
