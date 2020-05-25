import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, List } from 'mnet-ui-base';

import { locations } from './data';

const BasicList = () => (
  <>
    <Box align="center" pad="large">
      <List data={locations} />
    </Box>
  </>
);

storiesOf('List', module).add('basic', () => <BasicList />);
