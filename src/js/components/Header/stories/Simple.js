import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Box, Header } from 'mnet-ui-base';

export const Avatar = ({ ...rest }) => (
  <Box
    height="xxsmall"
    width="xxsmall"
    round="full"
    // eslint-disable-next-line max-len
    background="url(//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80)"
    {...rest}
  />
);

const Simple = () => (
  <>
    <Header background="light-4" pad="small">
      <Avatar />
      <Box direction="row" gap="medium">
        <Anchor label="Home" href="#" />
        <Anchor label="Profile" href="#" />
      </Box>
    </Header>
  </>
);

storiesOf('Header', module).add('Simple', () => <Simple />);
