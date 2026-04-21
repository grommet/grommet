import React from 'react';

import { Avatar, Box } from 'grommet';

export const Round = () => {
  const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    <Box direction="row" alignContent="center" gap="small" pad="large">
      <Avatar size="large" src={src} round={false} ariaLabel="Shimi" />
      <Avatar size="large" src={src} round="xsmall" ariaLabel="Shimi" />
      <Avatar size="large" src={src} round="small" ariaLabel="Shimi" />
      <Avatar size="large" src={src} round="medium" ariaLabel="Shimi" />
      <Avatar size="large" src={src} round="large" ariaLabel="Shimi" />
      <Avatar size="large" src={src} ariaLabel="Shimi" />
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Avatar/Round',
};
