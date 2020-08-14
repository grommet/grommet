import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Box,
  Button,
  Text,
  openConfirmAlert,
  closeConfirmAlert,
} from 'mnet-ui-base';

const CustomConfirm = () => {
  return(
  <Box align="center" justify="center" height="100vh" width="100vw">
    <Button
      onClick={
        () => openConfirmAlert({
          title: <Text>Confirm</Text>,
          message: <Text>This is a message from custom component</Text>,
          renderButton: <Button onClick={closeConfirmAlert} primary>OK</Button>,
        })
      }
    >
      <Text size="large" weight={600}>Open Confirm Box</Text>
    </Button>
  </Box>
)};

storiesOf('Modal Pop-up', module)
  .add('Custom Confirm Box', () => <CustomConfirm />);
