import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, List, Menu } from 'mnet-ui-base';
import { More } from 'grommet-icons';
import { mnet } from 'mnet-ui-base/themes';

import { data } from './data';

const ActionList = () => (
  <MnetUIBase theme={mnet}>
    <Box pad="large">
      <List
        data={data.slice(0, 10)}
        pad={{ left: 'small', right: 'none' }}
        action={() => (
          <Menu icon={<More />} hoverIndicator items={[{ label: 'one' }]} />
        )}
      />
    </Box>
  </MnetUIBase>
);

storiesOf('List', module).add('action', () => <ActionList />);
