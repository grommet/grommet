import React from 'react';
import { storiesOf } from '@storybook/react';

import { Favorite } from 'grommet-icons';

import { Avatar, Box, MnetUIBase } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Basic = () => {
  const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

  return (
    <MnetUIBase theme={mnet}>
      <Box
        align="center"
        justify="center"
        direction="row"
        gap="small"
        pad="large"
      >
        <Avatar src={src} />
        <Avatar background="accent-4">
          <Favorite color="accent-2" />
        </Avatar>
        <Avatar background="dark-2">R</Avatar>
        <Avatar background="brand">SY</Avatar>
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Avatar', module).add('Basic', () => <Basic />);
