import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, List, Text } from 'grommet';
import { grommet } from 'grommet/themes';

import { data } from './data';

const RenderedList = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <List
        data={data.slice(0, 10)}
        primaryKey={item => (
          <Text size="large" weight="bold">
            {item.entry}
          </Text>
        )}
        secondaryKey={item => (
          <Text size="small" color="dark-4">
            {item.location}
          </Text>
        )}
      />
    </Box>
  </Grommet>
);

storiesOf('List', module).add('key render', () => <RenderedList />);
