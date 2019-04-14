import React from "react";
import { Anchor, Box } from "grommet";
import { FacebookOption, Instagram, Twitter } from "grommet-icons";

const SocialMedia = () => (
  <Box direction="row" gap="xxsmall" justify="center">
    <Anchor
      target="_blank"
      a11yTitle="Share feedback on Github"
      href="https://www.instagram.com/"
      icon={<Instagram color="brand" size="medium" />}
    />
    <Anchor
      target="_blank"
      a11yTitle="Chat with us on Slack"
      href="https://www.facebook.com/"
      icon={<FacebookOption color="brand" size="medium" />}
    />
    <Anchor
      target="_blank"
      a11yTitle="Follow us on Twitter"
      href="https://twitter.com/"
      icon={<Twitter color="brand" size="medium" />}
    />
  </Box>
);

export { SocialMedia };
