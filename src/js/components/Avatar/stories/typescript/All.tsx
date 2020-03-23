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
  const shimi = 'shimrit.yacobi@gmail.com';
  const eric = '//s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80';
  const bryan = '//s.gravatar.com/avatar/10d15019166606cfed23846a7f902660?s=80';

  const borderSmall = { color: 'white', size: 'small' };

  const GroupedGravatar = ({ border }) => (
    <Stack anchor="left">
      <Avatar src={bryan} border={border} />
      <Avatar src={eric} border={border} margin={{ left: 'medium' }} />
      <Avatar email={shimi} border={border} margin={{ left: 'large' }} />
    </Stack>
  );

  const GroupedGravatarCentered = () => (
    <Stack anchor="right" margin={{ left: 'xlarge' }}>
      <Avatar src={bryan} />
      <Avatar email={shimi} margin={{ right: 'large' }} />
      <Avatar src={eric} margin={{ right: 'medium' }} />
    </Stack>
  );
  const GroupedGravatarRTL = () => (
    <Stack anchor="right" margin={{ left: 'xlarge' }}>
      <Avatar size="xsmall" email={shimi} />
      <Avatar size="xsmall" src={eric} margin={{ right: 'large' }} />
      <Avatar size="xsmall" src={bryan} margin={{ right: 'xlarge' }} />
    </Stack>
  );

  const GroupedIcons = () => (
    <Stack anchor="left">
      <Avatar background="accent-1">
        <UserNew color="accent-2" />
      </Avatar>
      <Avatar background="accent-2" margin={{ left: 'medium' }}>
        <GroupIcon color="accent-1" />
      </Avatar>
      <Avatar background="accent-4" margin={{ left: 'large' }}>
        <UserFemale color="accent-2" />
      </Avatar>
      <Avatar background="accent-3" margin={{ left: '72px' }}>
        <Favorite color="accent-2" />
      </Avatar>
    </Stack>
  );

  return (
    <Grommet theme={grommet}>
      <Box align="center" gap="medium" pad="large" background="dark-1">
        {/* Nested Avatars */}
        <Stack anchor="bottom-right">
          <Box>
            <Box direction="row">
              <Avatar size="xsmall" email={shimi} border={borderSmall} />
              <Box pad="xxsmall" />
            </Box>
            <Box pad="xxsmall" />
          </Box>
          <Avatar src={eric} size="42px" border={borderSmall} />
        </Stack>

        {/* Notification */}
        <Stack anchor="top-right">
          <Avatar email={shimi} />
          <Box pad="xsmall" round background="accent-4" responsive={false} />
        </Stack>

        {/* Groups */}
        <GroupedIcons />
        <GroupedGravatar border={borderSmall} />
        <GroupedGravatarCentered />
        <GroupedGravatarRTL />
      </Box>
    </Grommet>
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/Avatar', module).add('All', () => <Avatars />);
}
