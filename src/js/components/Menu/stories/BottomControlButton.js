import React from 'react';

import { Box, Menu } from 'grommet';

const ControlBottomMenu = () => (
  <Box height="medium" justify="center" align="center" pad="large">
    <Menu
      dropProps={{ align: { bottom: 'bottom', left: 'left' } }}
      label="actions"
      items={[
        { label: 'Profile', onClick: () => {} },
        { label: 'Settings', onClick: () => {} },
        { label: 'FAQ', onClick: () => {} },
      ]}
    />
  </Box>
);

export const BottomControlButton = () => <ControlBottomMenu />;
BottomControlButton.storyName = 'Bottom control button';

BottomControlButton.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Menu/Bottom control button',
};
