import React from 'react';

import { Grommet, Box, Menu, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { FormDown } from 'grommet-icons';

const MenuWithChildren = props => (
  <Menu
    plain
    items={[
      { label: 'Launch', onClick: () => {} },
      { label: 'Abort', onClick: () => {} },
    ]}
    {...props}
  >
    {({ disabled, drop, hover, focus }) => {
      const color = hover && !drop && !disabled ? 'accent-1' : undefined;
      return (
        <Box
          direction="row"
          gap="small"
          pad="small"
          background={hover && drop ? 'light-2' : undefined}
        >
          <Text color={color}>{focus ? 'actions' : 'Actions'}</Text>
          <FormDown color={color} />
        </Box>
      );
    }}
  </Menu>
);

const Example = () => (
  <Grommet theme={grommet}>
    <Box
      align="center"
      pad="large"
      background={{ color: 'dark-2', opacity: 0.7 }}
    >
      <MenuWithChildren disabled />
      <MenuWithChildren />
    </Box>
  </Grommet>
);

export const Children = () => <Example />;

export default {
  title: 'Controls/Menu/Children',
};
