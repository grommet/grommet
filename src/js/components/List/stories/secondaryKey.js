import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, List } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

import { data } from './data';

const SecondaryKeyList = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" pad="large">
      <List
        data={data.slice(0, 10)}
        primaryKey="entry"
        secondaryKey="location"
      />
    </Box>
  </MnetUIBase>
);

storiesOf('List', module).add('secondaryKey', () => <SecondaryKeyList />);
