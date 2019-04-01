import React from 'react';
import { Box, Text } from 'grommet';
import { StatusGood } from 'grommet-icons';
import { Toast } from './Toast';

export const AccountCreated = ({ onClose }) => (
  <Toast position="top" onClose={onClose} onEsc={onClose} duration={3}>
    <Box
      direction="row"
      align="center"
      justify="between"
      gap="small"
      round
      pad="small"
      background="status-ok"
    >
      <StatusGood />
      <Text size="large">Your account has been created with success!</Text>
    </Box>
  </Toast>
);
