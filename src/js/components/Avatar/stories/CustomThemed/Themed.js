import React from 'react';

import { Favorite } from 'grommet-icons';

import { Avatar, Box, Grommet } from 'grommet';

const theme = {
  avatar: {
    size: {
      myLarge: '70px',
    },
    text: {
      size: {
        myLarge: '32px',
      },
      fontWeight: 700,
      extend: `font-family: Comic Sans MS;`,
    },
    extend: `border: 2px solid white;
            box-shadow: 2px 2px 15px 1px white;`,
  },
};

export const Themed = () => {
  const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

  return (
    <Grommet theme={theme}>
      <Box
        align="center"
        justify="center"
        direction="row"
        gap="small"
        pad="large"
        background="dark-2"
      >
        <Avatar src={src} size="myLarge" />
        <Avatar size="myLarge" background="accent-4">
          <Favorite color="accent-2" size="36px" />
        </Avatar>
        <Avatar size="myLarge" background="dark-2">
          R
        </Avatar>
        <Avatar size="myLarge" background="brand">
          SY
        </Avatar>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Avatar/Custom Themed/Themed',
};
