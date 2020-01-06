import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, Menu, Text } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';
import { FormDown } from 'grommet-icons';

const CustomMenu = () => (
  <MnetUIBase theme={mnet}>
    <Box
      align="center"
      pad="large"
      background={{ color: 'dark-2', opacity: 0.7 }}
    >
      <Menu
        plain
        items={[
          { label: 'Launch', onClick: () => {} },
          { label: 'Abort', onClick: () => {} },
        ]}
      >
        {({ drop, hover }) => {
          const color = hover && !drop ? 'accent-1' : undefined;
          return (
            <Box
              direction="row"
              gap="small"
              pad="small"
              background={hover && drop ? 'light-2' : undefined}
            >
              <Text color={color}>actions</Text>
              <FormDown color={color} />
            </Box>
          );
        }}
      </Menu>
    </Box>
  </MnetUIBase>
);

storiesOf('Menu', module).add('Custom', () => <CustomMenu />);
