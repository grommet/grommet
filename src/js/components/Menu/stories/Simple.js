import React from 'react';

import { Box, Menu } from 'grommet';

const SimpleMenu = () => (
  <Box align="center" pad="large">
    <Menu
      dropProps={{
        a11yTitle: 'Simple drop content',
        align: { top: 'bottom', left: 'left' },
        elevation: 'xlarge',
      }}
      label="actions"
      items={[
        { label: 'Launch', onClick: () => {} },
        { label: 'Abort', onClick: () => {} },
        { label: 'Disabled', disabled: true },
      ]}
    />
  </Box>
);

export const Simple = () => <SimpleMenu />;
Simple.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Menu/Simple',
};
