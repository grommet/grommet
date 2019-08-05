import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Menu, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { FormDown } from 'grommet-icons';

const CustomMenu = () => (
  <Grommet theme={grommet}>
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
  </Grommet>
);

storiesOf('Menu', module).add('Custom', () => <CustomMenu />);
