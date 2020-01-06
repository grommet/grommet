import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, List, Text } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

import { data } from './data';

const RenderedList = () => (
  <MnetUIBase theme={mnet}>
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
  </MnetUIBase>
);

storiesOf('List', module).add('key render', () => <RenderedList />);
