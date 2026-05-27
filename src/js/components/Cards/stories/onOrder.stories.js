import React from 'react';
import { Box, Card, CardBody, CardFooter, Heading } from 'grommet';
import { Cards } from '../Cards';

const data = [
  { id: 'bo', city: 'Boise', state: 'Idaho' },
  { id: 'fc', city: 'Fort Collins', state: 'Colorado' },
  { id: 'ba', city: 'Bay Area', state: 'California' },
  { id: 'sd', city: 'San Diego', state: 'California' },
  { id: 'sf', city: 'San Francisco', state: 'California' },
  { id: 'la', city: 'Los Angeles', state: 'California' },
  { id: 'pt', city: 'Portland', state: 'Oregon' },
  { id: 'se', city: 'Seattle', state: 'Washington' },
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
          <Card key={datum.city} pad="medium" elevation="medium" as="li">
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
