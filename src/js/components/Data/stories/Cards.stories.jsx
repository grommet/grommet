import React from 'react';

import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Cards,
  Data,
  Heading,
  Main,
} from 'grommet';

import { DATA } from '../../DataTable/stories/data';

export const Example = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Main>
    <Box pad="large">
      <Data data={DATA} toolbar>
        <Cards size="medium">
          {(item) => (
            <Card as="li" key={item.name} pad="small">
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
  </Main>
  // </Grommet>
);

Example.storyName = 'Cards';

Example.args = {
  full: true,
};

export default {
  title: 'Data/Data/Cards',
};
