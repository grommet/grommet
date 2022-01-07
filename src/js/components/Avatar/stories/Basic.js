import React from 'react';

import { Favorite } from 'grommet-icons';

import { Avatar, Box } from 'grommet';

export const Basic = () => {
  const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    <Box
      align="center"
      justify="center"
      direction="row"
      gap="small"
      pad="large"
    >
      <Avatar src={src} />
      <Avatar background="dark-4">
        <Favorite color="light-2" />
      </Avatar>
      <Avatar background="dark-2">R</Avatar>
      <Avatar background="brand">SY</Avatar>
    </Box>
    // </Grommed>
  );
};

export default {
  title: 'Visualizations/Avatar/Basic',
};
