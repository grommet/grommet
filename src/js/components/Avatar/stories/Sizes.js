import React from 'react';
import { storiesOf } from '@storybook/react';

import { Avatar, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const Sizes = () => {
  const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return (
    <Grommet theme={grommet}>
      <Box direction="row" pad="large">
        <Avatar size="small" src={src} />
        <Avatar size="medium" src={src} />
        <Avatar size="large" src={src} />
        <Avatar size="xlarge" src={src} />
      </Box>
    </Grommet>
  );
};

storiesOf('Avatar', module).add('Sizes', () => <Sizes />);
