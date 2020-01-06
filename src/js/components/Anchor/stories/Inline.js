import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Box, MnetUIBase, Paragraph } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Inline = () => {
  return (
    <MnetUIBase theme={mnet}>
      <Box align="center" pad="large">
        <Paragraph>
          This is <Anchor label="an inline link" href="#" /> with surrounding
          text.
        </Paragraph>
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Anchor', module).add('Inline', () => <Inline />);
