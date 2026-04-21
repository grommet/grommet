import React from 'react';

import { Avatar, Box } from 'grommet';

export const Round = () => {
  const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    <Box direction="row" alignContent="center" gap="small" pad="large">
      <Avatar size="large" src={src} round={false} aria-label="Shimi" />
      <Avatar size="large" src={src} round="xsmall" aria-label="Shimi" />
      <Avatar size="large" src={src} round="small" aria-label="Shimi" />
      <Avatar size="large" src={src} round="medium" aria-label="Shimi" />
      <Avatar size="large" src={src} round="large" aria-label="Shimi" />
      <Avatar size="large" src={src} aria-label="Shimi" />
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Avatar/Round',
};
