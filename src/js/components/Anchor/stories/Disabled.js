import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Box } from 'mnet-ui-base';

const Disabled = () => {
  return (
    <div>
      <Box align="center" pad="large">
        <Box margin="small">
          <Anchor disabled label="Disabled Anchor" />
        </Box>
      </Box>
    </div>
  );
};

storiesOf('Anchor', module).add('Disabled', () => <Disabled />);
