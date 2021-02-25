import React from 'react';

import { Grommet, Box, Menu } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const myTheme = deepMerge(grommet, {
  menu: {
    drop: {
      align: {
        top: 'top',
        left: 'right',
      },
    },
  },
});
const SimpleMenu = () => (
  <Grommet theme={myTheme}>
    <Box align="center" pad="large">
      <Menu
        // dropProps={{
        //   align: { top: 'bottom', left: 'left' },
        //   elevation: 'xlarge',
        // }}
        label="actions"
        items={[
          { label: 'Launch Something', onClick: () => {} },
          { label: 'Abort Something', onClick: () => {} },
          { label: 'Disabled', disabled: true },
        ]}
      />
    </Box>
  </Grommet>
);

export const Simple = () => <SimpleMenu />;
Simple.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Menu/Simple',
};
