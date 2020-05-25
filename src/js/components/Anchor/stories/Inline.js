import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Box, Paragraph } from 'mnet-ui-base';

const Inline = () => {
  return (
    <div>
      <Box align="center" pad="large">
        <Paragraph>
          This is <Anchor label="an inline link" href="#" /> with surrounding
          text.
        </Paragraph>
      </Box>
    </div>
  );
};

storiesOf('Anchor', module).add('Inline', () => <Inline />);
