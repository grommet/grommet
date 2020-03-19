import React from 'react';
import { storiesOf } from '@storybook/react';

import { Add } from 'grommet-icons';

import { Avatar, Box, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const Basic = () => {
  const src =
    'url(//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80)';

  return (
    <Grommet theme={grommet}>
      <Box align="center" direction="row" gap="small" pad="large">
        <Avatar src={src} round />
        <Avatar>
          <Box background="accent-2" align="center" pad="small" round>
            <Add color="accent-1" />
          </Box>
        </Avatar>
        <Avatar background="dark-2">
          <Text alignSelf="center" size="xxlarge">
            R
          </Text>
        </Avatar>
      </Box>
    </Grommet>
  );
};

storiesOf('Avatar', module).add('Basic', () => <Basic />);
