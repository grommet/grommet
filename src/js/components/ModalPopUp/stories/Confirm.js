import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Box,
  Button,
  Text,
  openConfirmAlert,
  closeConfirmAlert,
  modalIsLoading,
} from 'mnet-ui-base';

const Confirm = () => {
  const okClick = () => {
    modalIsLoading(true);
    setTimeout(() => {
      modalIsLoading(false);
      closeConfirmAlert();
    }, 3000);
  };

  return(
  <Box align="center" justify="center" height="100vh" width="100vw">
    <Button
      onClick={
        () => openConfirmAlert({
          title: 'Confirm',
          message: 'This is a message',
          onPrimaryClick: okClick,
        })
      }
    >
      <Text size="large" weight={600}>Open Confirm Box</Text>
    </Button>
  </Box>
)};

storiesOf('Modal Pop-up', module).add('Confirm Box', () => <Confirm />);
