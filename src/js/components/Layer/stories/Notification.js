import React from 'react';
import { storiesOf } from '@storybook/react';

import { Add, FormClose, StatusGood } from 'grommet-icons';

import { Box, Button, MnetUIBase, Layer, Text } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const NotificationLayer = () => {
  const [open, setOpen] = React.useState();

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(undefined);

  return (
    <MnetUIBase theme={mnet} full>
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
              <Text>A new virtual machine has been successfully added</Text>
            </Box>
            <Button icon={<FormClose />} onClick={onClose} plain />
          </Box>
        </Layer>
      )}
    </MnetUIBase>
  );
};

storiesOf('Layer', module).add('Notification', () => <NotificationLayer />);
