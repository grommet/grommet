import React from "react";
import { Box, Text, Anchor } from "grommet";
import { Slack } from "grommet-icons";
import { Toast } from "./Toast";

export const Join = ({ onClose }) => (
  <Toast modal onEsc={onClose} onClickOutside={onClose} position="right">
    <Box
      direction="row"
      align="center"
      justify="center"
      elevation="medium"
      pad={{ vertical: `xsmall`, horizontal: `medium` }}
      background="light-3"
      height="xsmall"
      gap="small"
    >
      <Slack color="neutral-3" size="large" />
      <Text size="medium">Join our Slack to propose more pattern ideas!</Text>
      <Anchor
        rel="noopener noreferrer"
        color="brand"
        label="Join!"
        href="http://slackin.grommet.io/"
      />
    </Box>
  </Toast>
);
