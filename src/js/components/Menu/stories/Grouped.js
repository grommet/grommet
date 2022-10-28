import React from 'react';

import { Box, Menu } from 'grommet';

export const Grouped = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" pad="large">
    <Menu
      dropProps={{
        align: { top: 'bottom', left: 'left' },
        elevation: 'xlarge',
      }}
      label="Grouped Menu"
      items={[
        [
          { label: 'View Details' },
          {
            label: 'Edit Permissions',
          },
          { label: 'Update Password' },
        ],
        [{ label: 'Delete' }],
      ]}
    />
  </Box>
  // </Grommet>
);

Grouped.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Menu/Grouped',
};
