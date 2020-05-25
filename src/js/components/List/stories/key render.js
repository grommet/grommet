import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, List, Text } from 'mnet-ui-base';

import { data } from './data';

const RenderedList = () => (
  <>
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
  </>
);

storiesOf('List', module).add('key render', () => <RenderedList />);
