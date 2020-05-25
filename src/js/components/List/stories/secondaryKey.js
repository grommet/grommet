import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, List } from 'mnet-ui-base';

import { data } from './data';

const SecondaryKeyList = () => (
  <>
    <Box align="center" pad="large">
      <List
        data={data.slice(0, 10)}
        primaryKey="entry"
        secondaryKey="location"
      />
    </Box>
  </>
);

storiesOf('List', module).add('secondaryKey', () => <SecondaryKeyList />);
