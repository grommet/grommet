import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, List, Menu } from 'grommet';
import { More } from 'grommet-icons';
import { grommet } from 'grommet/themes';

import { data } from './data';

const ActionableList = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <List
        data={data.slice(0, 10)}
        action={() => <Menu icon={<More />} hoverIndicator />}
      />
    </Box>
  </Grommet>
);

storiesOf('List', module).add('Actionable', () => <ActionableList />);
