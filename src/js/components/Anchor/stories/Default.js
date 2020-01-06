import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Box, MnetUIBase } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Default = () => {
  return (
    <MnetUIBase theme={mnet}>
      <Box align="center" pad="large">
        <Anchor href="#">Link</Anchor>
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Anchor', module).add('Default', () => <Default />);
