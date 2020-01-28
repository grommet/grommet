import React from 'react';
import { storiesOf } from '@storybook/react';

import { Gremlin } from 'grommet-icons';

import { Box, Grommet, grommet, List, Text } from 'grommet';

export const data = ['Boise', 'Fort Collins', 'Bay Area', 'North Carolina'];

export const ChildrenExample = () => (
  <Grommet theme={grommet}>
    <Box pad="large" height="100%" background="light-2">
      <List data={data} pad="medium">
        {(datum, index) => (
          <Box
            key={index}
            direction="row-responsive"
            gap="large"
            size="xsmall"
            align="center"
          >
            <Gremlin size="large" />
            <Text weight="bold">{datum}</Text>
          </Box>
        )}
      </List>
    </Box>
  </Grommet>
);

storiesOf('List', module).add('children', () => <ChildrenExample />);
