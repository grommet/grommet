import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Box } from 'mnet-ui-base';

const Default = () => {
  return (
    <div>
      <Box align="center" pad="large">
        <Anchor href="#">Link</Anchor>
      </Box>
    </div>
  );
};

storiesOf('Anchor', module).add('Default', () => <Default />);
