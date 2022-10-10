import React from 'react';

import { Box, Menu, Text } from 'grommet';
import { FormDown } from 'grommet-icons';

const MenuWithChildren = (props) => (
  <Menu
    plain
    items={[
      { label: 'Launch', onClick: () => {} },
      { label: 'Abort', onClick: () => {} },
    ]}
    {...props}
  >
    {({ disabled, drop, hover }) => {
      const color = hover && !drop && !disabled ? 'brand' : undefined;
      return (
        <Box
          direction="row"
          gap="small"
          pad="small"
          background={hover && drop ? 'light-2' : undefined}
        >
          <Text color={color}>Actions</Text>
          <FormDown color={color} />
        </Box>
      );
    }}
  </Menu>
);

const Example = () => (
  <Box align="center" pad="large" gap="small">
    <MenuWithChildren disabled />
    <MenuWithChildren />
  </Box>
);

export const Children = () => <Example />;

export default {
  title: 'Controls/Menu/Children',
};
