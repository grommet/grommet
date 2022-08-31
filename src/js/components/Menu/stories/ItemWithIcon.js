import React from 'react';

import { Box, Menu, Text } from 'grommet';
import { FormDown, Github, Slack } from 'grommet-icons';

// This story offers a suggested workaround for issue #3209.

const IconItemsMenu = () => (
  <Box align="center" pad="large">
    <Menu
      plain
      open
      items={[
        {
          label: <Box alignSelf="center">Github</Box>,
          onClick: () => {},
          icon: (
            <Box pad="medium">
              <Github size="large" />
            </Box>
          ),
        },
        {
          label: <Box alignSelf="center">Slack</Box>,
          onClick: () => {},
          icon: (
            <Box pad="medium">
              <Slack size="large" />
            </Box>
          ),
        },
      ]}
    >
      <Box direction="row" gap="small" pad="large">
        <FormDown />
        <Text>Menu with Icon on the left</Text>
      </Box>
    </Menu>
  </Box>
);

export const ItemWithIcon = () => <IconItemsMenu />;
ItemWithIcon.storyName = 'Item with icon';

export default {
  title: 'Controls/Menu/Item with icon',
};
