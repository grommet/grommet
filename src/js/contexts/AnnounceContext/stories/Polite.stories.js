import React, { useContext, useEffect } from 'react';

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

const ScreenReaderOnly = () => {
  useEffect(() => {
    if (!document.getElementById('live-region')) {
      const announcer = document.createElement('div');
      announcer.setAttribute('id', 'live-region');
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.style.position = 'absolute';
      announcer.style.left = '-9999px';
      announcer.style.height = '1px';
      announcer.style.width = '1px';
      announcer.style.overflow = 'hidden';
      document.body.appendChild(announcer);
    }
  }, []);

  const handleAnnounce = () => {
    const announcer = document.getElementById('live-region');

    // Clear message
    announcer.textContent = '';

    // Force reflow
    void announcer.offsetWidth;

    // Announce new message
    announcer.textContent =
      'This is a test announcement triggered by the button click.';

    console.log(
      'Announcing: This is a test announcement triggered by the button click.',
    );
  };

  return (
    <div style={{ padding: 50 }}>
      <button onClick={handleAnnounce}>Announce</button>
    </div>
  );
};

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
        reverse
        onClick={() => {
          announce(message, mode);
        }}
      />
    </Box>
  );
};

export const Polite = () => (
  // <Grommet theme={grommet} full>
  //   <Box justify="center" align="center" fill>
  //     <PageContent mode="polite" role="log" />
  //   </Box>
  // </Grommet>
  <ScreenReaderOnly />
);

export default {
  title: 'Utilities/AnnounceContext/Polite',
};
