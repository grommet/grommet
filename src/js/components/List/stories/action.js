import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, List, Menu } from 'mnet-ui-base';
import { More } from 'grommet-icons';

import { data } from './data';

const ActionList = () => (
  <>
    <Box pad="large">
      <List
        data={data.slice(0, 10)}
        pad={{ left: 'small', right: 'none' }}
        action={(item, index) => {
          return (
            <Menu
              key={index}
              icon={<More />}
              hoverIndicator
              items={[{ label: 'one' }]}
            />
          );
        }}
      />
    </Box>
  </>
);

storiesOf('List', module).add('action', () => <ActionList />);
