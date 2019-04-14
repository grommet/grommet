import React from 'react'
import { Alert } from 'grommet-icons'
import { Box, Text, Anchor } from 'grommet'

export const AlertNotification = ({ message, onClose }) => (
  <Box fill="horizontal" background="status-warning">
    <Box pad="medium" direction="row" gap="medium" align="center">
      <Alert />
      <Text>{message}</Text>
      <Anchor color="dark-2" onClick={onClose} label="Acknowledge" />
    </Box>
  </Box>
)
