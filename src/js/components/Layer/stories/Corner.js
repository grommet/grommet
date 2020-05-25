import React from 'react';
import { storiesOf } from '@storybook/react';

import { Add } from 'grommet-icons';

import { Box, Button, Layer, Text } from 'mnet-ui-base';

const CornerLayer = () => {
  const [open, setOpen] = React.useState();

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(undefined);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
      <Box fill align="center" justify="center">
        <Button
          icon={<Add color="brand" />}
          label={
            <Text>
              <strong>Add Corner Layer</strong>
            </Text>
          }
          onClick={onOpen}
          plain
        />
      </Box>
      {open && (
        <Layer position="top-right" onClickOutside={onClose}>
          <Box height="small" overflow="auto">
            <Box pad="xlarge">Corner top-right position</Box>
          </Box>
        </Layer>
      )}
    </div>
  );
};

storiesOf('Layer', module).add('Corner', () => <CornerLayer />);
