import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, CheckBoxGroup, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const Simple = () => {
  return (
    <Grommet theme={grommet}>
      <Box pad="medium">
        <CheckBoxGroup options={['First', 'Second', 'Third']} />
      </Box>
    </Grommet>
  );
};

storiesOf('CheckBoxGroup', module).add('Simple', () => <Simple />);
