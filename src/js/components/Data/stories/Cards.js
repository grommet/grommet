import React from 'react';

import { Box, Card, CardBody, CardFooter, Cards, Data, Heading } from 'grommet';

import { DATA } from '../../DataTable/stories/data';

export const Example = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="large">
    <Data data={DATA} toolbar>
      <Cards size="medium">
        {(item) => (
          <Card key={item.name} pad="small">
            <CardBody>
              <Heading level={2} margin="none">
                {item.name}
              </Heading>
            </CardBody>
            <CardFooter>{item.location || '--'}</CardFooter>
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
  title: 'Data/Data/Cards',
};
