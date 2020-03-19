import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import {
  Favorite,
  Group as GroupIcon,
  UserFemale,
  UserNew,
} from 'grommet-icons';

import { Avatar, Box, Grommet, Stack } from 'grommet';
import { grommet } from 'grommet/themes';

const Avatars = () => {
  const src =
    'url(//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80)';
  const eric =
    'url(//s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80)';
  const bryan =
    'url(//s.gravatar.com/avatar/10d15019166606cfed23846a7f902660?s=80  )';
  const borderSmall = { color: 'white', size: 'small' };
  const borderMedium = { color: 'white', size: 'medium' };

  const Group = ({ border }) => (
    <Stack anchor="left">
      <Avatar src={bryan} round border={border} />
      <Avatar src={eric} round border={border} margin={{ left: 'medium' }} />
      <Avatar src={src} round border={border} margin={{ left: 'large' }} />
    </Stack>
  );

  const GroupedIcons = () => (
    <Stack anchor="left">
      <Avatar>
        <Box background="accent-1" align="center" pad="small" round>
          <UserNew color="accent-2" />
        </Box>
      </Avatar>
      <Avatar margin={{ left: 'medium' }}>
        <Box background="accent-2" align="center" pad="small" round>
          <GroupIcon color="accent-1" />
        </Box>
      </Avatar>
      <Avatar margin={{ left: 'large' }}>
        <Box background="accent-4" align="center" pad="small" round>
          <UserFemale color="accent-2" />
        </Box>
      </Avatar>
      <Avatar margin={{ left: '75px' }}>
        <Box background="accent-3" align="center" pad="small" round>
          <Favorite color="accent-2" />
        </Box>
      </Avatar>
    </Stack>
  );

  return (
    <Grommet theme={grommet}>
      <Box align="center" gap="medium" pad="large" background="dark-1">
        <Stack anchor="top-right">
          <Avatar src={src} round />
          <Box pad="xsmall" round background="accent-4" fill={false} />
        </Stack>
        <Group border={borderMedium} />
        <Group border={borderSmall} />
        <GroupedIcons />
        <Avatar src={src} />
        <Avatar size="xsmall" src={src} />
        <Avatar size="small" src={src} />
      </Box>
    </Grommet>
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/Avatar', module).add('All', () => <Avatars />);
}
