import React from 'react';

import { Avatar, Box, Paragraph } from 'grommet';

export const Sizes = () => {
  const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    <Box>
      <Box direction="row" pad="large" gap="small">
        <Avatar size="small" src={src} />
        <Avatar size="medium" src={src} />
        <Avatar size="large" src={src} />
        <Avatar size="xlarge" src={src} />
        <Avatar size="2xl" src={src} />
      </Box>
      <Box direction="row" pad="large" align="center" gap="small">
        <Avatar background="dark-2" size="small">
          S
        </Avatar>
        <Avatar background="dark-2" size="medium">
          LS
        </Avatar>
        <Avatar background="dark-2" size="large">
          JF
        </Avatar>
        <Avatar background="dark-2" size="xlarge">
          SY
        </Avatar>
        <Avatar background="dark-2" size="2xl">
          SOS
        </Avatar>
      </Box>
      <Box margin={{ vertical: 'xlarge' }}>
        <Paragraph textAlign="center" align="center">
          Larger Avatars
        </Paragraph>
        <Box direction="row" pad="large" align="center" gap="small">
          <Avatar background="dark-2" size="3xl">
            3xl
          </Avatar>
          <Avatar background="dark-2" size="4xl">
            4xl
          </Avatar>
          <Avatar background="dark-2" size="5xl">
            5xl
          </Avatar>
        </Box>
        <Box direction="row" pad="large" gap="small">
          <Avatar size="3xl" src={src} />
          <Avatar size="4xl" src={src} />
          <Avatar size="5xl" src={src} />
        </Box>
      </Box>
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Avatar/Sizes',
};
