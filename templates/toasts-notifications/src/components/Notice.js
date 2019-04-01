import React from "react";
import { Box, Text, Button } from "grommet";
import { Toast } from "./Toast";

export const Notice = ({ onClose }) => (
  <Toast position="bottom" full="horizontal" modal={false} responsive={false}>
    <Box
      direction="row"
      align="center"
      justify="between"
      elevation="small"
      pad={{ vertical: `small`, horizontal: `large` }}
      background="brand"
      gap="medium"
    >
      <Text size="medium">
        We do not use cookies in this website! Continue browsing or dismiss this
        message to accept!
      </Text>
      <Button primary label="Got it!" onClick={onClose} />
    </Box>
  </Toast>
);
