import React from 'react';

import { Add, FormClose, StatusGood } from 'grommet-icons';

import { Box, Button, Grommet, Layer, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const NotificationLayer = () => {
  const [open, setOpen] = React.useState();

  const onOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(undefined);
    }, 3000);
  };

  const onClose = () => setOpen(undefined);

  return (
    <Grommet theme={grommet} full>
      <Box fill align="center" justify="center">
        <Button
          icon={<Add color="brand" />}
          label={
            <Text>
              <strong>Add</strong>
            </Text>
          }
          onClick={onOpen}
          plain
        />
      </Box>
      {open && (
        <Layer
          position="bottom"
          modal={false}
          margin={{ vertical: 'medium', horizontal: 'small' }}
          onEsc={onClose}
          responsive={false}
          plain
        >
          <Box
            align="center"
            direction="row"
            gap="small"
            justify="between"
            round="medium"
            elevation="medium"
            pad={{ vertical: 'xsmall', horizontal: 'small' }}
            background="status-ok"
          >
            <Box align="center" direction="row" gap="xsmall">
              <StatusGood />
              <Text>
                A new virtual machine has been successfully added (this Layer
                will close after 3 seconds)
              </Text>
            </Box>
            <Button icon={<FormClose />} onClick={onClose} plain />
          </Box>
        </Layer>
      )}
    </Grommet>
  );
};

NotificationLayer.storyName = 'Notification';

NotificationLayer.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Layout/Layer/Notification',
};
