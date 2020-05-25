import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, CheckBoxGroup, MnetUIBase } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Simple = () => {
  return (
    <MnetUIBase theme={mnet}>
      <Box pad="medium">
        <CheckBoxGroup options={['First', 'Second', 'Third']} />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('CheckBoxGroup', module).add('Simple', () => <Simple />);
