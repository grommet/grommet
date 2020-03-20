import React from 'react';
import { storiesOf } from '@storybook/react';

import { Link, Box, Grommet, Paragraph } from 'grommet';
import { grommet } from 'grommet/themes';

const Inline = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Paragraph>
          This is <Link label="an inline link" href="#to-something" /> with
          surrounding text.
        </Paragraph>
      </Box>
    </Grommet>
  );
};

storiesOf('Link', module).add('Inline', () => <Inline />);
