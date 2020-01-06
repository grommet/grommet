import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, List } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

import { locations } from './data';

const BasicList = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" pad="large">
      <List data={locations} />
    </Box>
  </MnetUIBase>
);

storiesOf('List', module).add('basic', () => <BasicList />);
