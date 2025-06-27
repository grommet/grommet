import React, { useContext } from 'react';

import { Announce } from 'grommet-icons';

import { grommet } from 'grommet/themes'; // used only for the grommet's font
import {
  Anchor,
  AnnounceContext,
  Box,
  Button,
  Grommet,
  Paragraph,
} from 'grommet';

const message = `Thank you for clicking the Announce Button,
this announcement is being broadcast on the Button's click.`;

const PageContent = ({ mode }) => {
  const announce = useContext(AnnounceContext);
  return (
    <Box align="center" gap="medium">
      <Paragraph textAlign="center">
        Announce can only be &quot;observed&quot; via a screen reader.
        Here&apos;s{' '}
        <Anchor
          label=" how to turn it on"
          href="https://www.codecademy.com/articles/how-to-setup-screen-reader#:~:text=(OS%20X)%20VoiceOver,Command%2DF5%20turns%20it%20off."
        />
        , hint: Command-F5 on OSX. Clicking the Button below will trigger an
        announcement.
      </Paragraph>
      <Button
        label="Announce"
        icon={<Announce />}
        a11yTitle="Announce button"
        reverse
        onClick={() => {
          announce(message, mode);
        }}
      />
    </Box>
  );
};

export const Polite = () => (
  <Grommet theme={grommet} full>
    <Box justify="center" align="center" fill>
      <PageContent mode="polite" role="log" />
    </Box>
  </Grommet>
);

export default {
  title: 'Utilities/AnnounceContext/Polite',
};
