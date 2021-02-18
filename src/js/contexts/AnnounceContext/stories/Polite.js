import React, { useContext, useState } from 'react';

import { Announce } from 'grommet-icons';
import { grommet } from 'grommet/themes';
import {
  Anchor,
  AnnounceContext,
  Box,
  Button,
  Grommet,
  Heading,
  Paragraph,
  Text,
} from 'grommet';

const message = `Thank you for clicking the Announce Button, 
this announcement is currently being broadcast.`;

const Announcer = ({ mode, role }) => {
  const announce = useContext(AnnounceContext);
  const [show, setShow] = useState(false);
  return (
    <Box align="center" gap="medium">
      <Button
        label="Announce"
        icon={<Announce />}
        a11yTitle="Announce button"
        reverse
        onClick={() => {
          setShow(true);
          announce(message, mode);
        }}
      />

      {show && (
        <Text role={role} aria-live={mode}>
          {message}
        </Text>
      )}
    </Box>
  );
};

export const Polite = () => (
  <Grommet theme={grommet} full>
    <Box justify="center" align="center" background="brand" fill gap="medium">
      <Heading>Welcome to announcement section</Heading>
      <>
        <Paragraph textAlign="center">
          This component will demonstrate a screen reader accessibility feature
          via turning on the
          <Anchor
            label=" turning on the Screen reader mode."
            href="https://www.codecademy.com/articles/how-to-setup-screen-reader#:~:text=(OS%20X)%20VoiceOver,Command%2DF5%20turns%20it%20off."
          />{' '}
          An The announcement will be broadcast once clicking on the announce
          Button, turn on your clients Screen Reader mode to listen:
        </Paragraph>
      </>
      <Announcer mode="polite" role="log" />
    </Box>
  </Grommet>
);

export default {
  title: 'Utilities/AnnounceContext/Polite',
};
