import React from 'react';
import { storiesOf } from '@storybook/react';

import { Favorite } from 'grommet-icons';

import { Avatar, Box, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const Basic = () => {
  const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

  return (
    <Grommet theme={grommet}>
      <Box
        align="center"
        justify="center"
        direction="row"
        gap="small"
        pad="large"
      >
        <Avatar src={src} />
        <Avatar src={<Favorite color="accent-2" />} background="accent-4" />
        <Avatar background="dark-2">
          <Text alignSelf="center" size="xlarge">
            R
          </Text>
        </Avatar>
        <Avatar background="brand">
          <Text alignSelf="center" size="xlarge">
            SY
          </Text>
        </Avatar>
      </Box>
    </Grommet>
  );
};

storiesOf('Avatar', module).add('Basic', () => <Basic />);
