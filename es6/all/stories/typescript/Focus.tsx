import React from 'react';
import { storiesOf } from '@storybook/react';

import { deepMerge } from 'grommet/utils';

import {
  grommet,
  Anchor,
  Box,
  Button,
  Grommet,
  Menu,
  Text,
  TextInput,
} from 'grommet';

const customFocus = deepMerge(grommet, {
  global: {
    colors: {
      focus: 'neutral-3',
    },
  },
});

const CustomFocusFC = () => (
  <Grommet theme={customFocus}>
    <Box pad="small" gap="medium" width="medium">
      <Text>
        Focus on the input components and notice the custom focus color
      </Text>
      <TextInput placeholder="hi" />
      <Anchor href="">Anchor</Anchor>
      <Menu
        label="Menu"
        items={[{ label: 'One', onClick: () => {} }, { label: 'Two' }]}
      />
      <Button label="Button" onClick={() => {}} />
    </Box>
  </Grommet>
);

storiesOf('Theme', module).add('Focus', () => <CustomFocusFC />);
