import React from 'react';

import { Grommet, Box, Menu } from 'grommet';
import { grommet } from 'grommet/themes';

const ControlBottomMenu = () => (
  <Grommet theme={grommet}>
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
  </Grommet>
);

export const BottomControlButton = () => <ControlBottomMenu />;
BottomControlButton.storyName = 'Bottom control button';

BottomControlButton.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Menu/Bottom control button',
};
