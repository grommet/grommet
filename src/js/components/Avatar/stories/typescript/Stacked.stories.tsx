import React from 'react';

import { Favorite, UserFemale, UserNew } from 'grommet-icons';

import { Avatar, Box, Stack } from 'grommet';

export const Stacked = () => {
  const shimi = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  const eric = '//s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80';
  const bryan = '//s.gravatar.com/avatar/10d15019166606cfed23846a7f902660?s=80';

  const borderSmall = { color: 'white', size: 'small' };

  const GroupedGravatar = ({ border }) => (
    <Stack anchor="left">
      <Avatar src={bryan} border={border} a11yTitle="Bryan" />
      <Avatar
        src={eric}
        border={border}
        margin={{ left: 'medium' }}
        a11yTitle="Eric"
      />
      <Avatar
        src={shimi}
        border={border}
        margin={{ left: 'large' }}
        a11yTitle="Shimi"
      />
    </Stack>
  );

  const GroupedGravatarCentered = () => (
    <Stack anchor="right" margin={{ left: 'xlarge' }}>
      <Avatar src={bryan} a11yTitle="Bryan" />
      <Avatar src={shimi} margin={{ right: 'large' }} a11yTitle="Shimi" />
      <Avatar src={eric} margin={{ right: 'medium' }} a11yTitle="Eric" />
    </Stack>
  );
  const GroupedGravatarRTL = () => (
    <Stack anchor="right" margin={{ left: 'xlarge' }}>
      <Avatar size="large" src={shimi} a11yTitle="Shimi" />
      <Avatar
        size="large"
        src={eric}
        margin={{ right: 'large' }}
        a11yTitle="Eric"
      />
      <Avatar
        size="large"
        src={bryan}
        margin={{ right: 'xlarge' }}
        a11yTitle="Bryan"
      />
    </Stack>
  );

  const GroupedIcons = () => (
    <Stack anchor="left">
      <Avatar background="dark-1" a11yTitle="New user">
        <UserNew color="light-2" />
      </Avatar>
      <Avatar
        background="dark-2"
        margin={{ left: 'medium' }}
        a11yTitle="Female user"
      >
        <UserFemale color="light-1" />
      </Avatar>
      <Avatar
        background="dark-4"
        margin={{ left: 'large' }}
        a11yTitle="Favorites"
      >
        <Favorite color="light-2" />
      </Avatar>
    </Stack>
  );

  return (
    <Box>
      <Box align="center" gap="medium" pad="large" background="dark-1">
        {/* Nested Avatars */}
        <Stack anchor="bottom-right">
          <Box>
            <Box direction="row">
              <Avatar
                size="xlarge"
                src={shimi}
                border={borderSmall}
                a11yTitle="Shimi"
              />
              <Box pad="xxsmall" />
            </Box>
            <Box pad="xxsmall" />
          </Box>
          <Avatar src={eric} border={borderSmall} a11yTitle="Eric" />
        </Stack>

        {/* Notification */}
        <Stack anchor="top-right">
          <Avatar src={shimi} a11yTitle="Shimi" />
          <Box pad="xsmall" round background="light-1" responsive={false} />
        </Stack>

        {/* Groups */}
        <GroupedIcons />
        <GroupedGravatar border={borderSmall} />
        <GroupedGravatarCentered />
        <GroupedGravatarRTL />
      </Box>
    </Box>
  );
};

export default {
  title: 'Visualizations/Avatar/Stacked',
};
