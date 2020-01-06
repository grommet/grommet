import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Box, MnetUIBase } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Disabled = () => {
  return (
    <MnetUIBase theme={mnet}>
      <Box align="center" pad="large">
        <Box margin="small">
          <Anchor disabled label="Disabled Anchor" />
        </Box>
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Anchor', module).add('Disabled', () => <Disabled />);
