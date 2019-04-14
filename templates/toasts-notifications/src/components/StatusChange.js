import React from "react";
import { Box, Text, Anchor } from "grommet";
import { Favorite } from "grommet-icons";
import { Toast } from "./Toast";

export const StatusChange = ({ onClose }) => (
  <Toast position="left">
    <Box
      direction="row"
      elevation="medium"
      pad={{ vertical: `xsmall`, horizontal: `large` }}
      background="light-3"
      gap="small"
    >
      <Box gap="xsmall" align="center" direction="row">
        <Text size="small">
          Rescheduled meeting for <br />
          Thursday 14th of February.
        </Text>
        <Favorite color="status-error" />
      </Box>
      <Box pad="small" border="left" align="center">
        <Anchor color="dark-2" label="Noted!" onClick={onClose} />
      </Box>
    </Box>
  </Toast>
);
