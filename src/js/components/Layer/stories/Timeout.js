import React from 'react';

import { FormClose } from 'grommet-icons';

import { Box, Button, Grommet, Layer, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const Timeout = () => {
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
        <Button label="Show Layer" onClick={onOpen} />
      </Box>
      {open && (
        <Layer
          position="top"
          modal={false}
          margin={{ vertical: 'medium', horizontal: 'small' }}
          onEsc={onClose}
          responsive={false}
        >
          <Box
            align="center"
            direction="row"
            round="medium"
            elevation="medium"
            pad={{ vertical: 'xsmall', horizontal: 'small' }}
            background="light-3"
          >
            <Box align="center" direction="row" gap="xsmall">
              <Text>This Layer will disappear after 3 seconds</Text>
            </Box>
            <Button icon={<FormClose />} onClick={onClose} plain />
          </Box>
        </Layer>
      )}
    </Grommet>
  );
};

Timeout.story = {
  parameters: {
    chromatic: { disable: true },
  },
};
