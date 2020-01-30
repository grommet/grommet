import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, List, Menu } from 'grommet';
import { More } from 'grommet-icons';
import { grommet } from 'grommet/themes';

import { data } from './data';

const ActionList = () => (
  <Grommet theme={grommet}>
    <Box pad="large">
      <List
        data={data.slice(0, 10)}
        pad={{ left: 'small', right: 'none' }}
        action={() => (
          <Menu icon={<More />} hoverIndicator items={[{ label: 'one' }]} />
        )}
      />
    </Box>
  </Grommet>
);

storiesOf('List', module).add('action', () => <ActionList />);
