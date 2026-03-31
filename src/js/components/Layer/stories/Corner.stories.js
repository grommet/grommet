import React from 'react';

import { Add } from 'grommet-icons';

import { Box, Button, Layer, Text } from 'grommet';

export const CornerLayer = () => {
  const [open, setOpen] = React.useState();

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(undefined);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <>
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
    </>
    // </Grommet>
  );
};

CornerLayer.storyName = 'Corner';

CornerLayer.parameters = {
  chromatic: { disable: true },
};

CornerLayer.args = {
  full: true,
};

export default {
  title: 'Layout/Layer/Corner',
};
