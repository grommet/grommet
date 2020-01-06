import React from 'react';
import { storiesOf } from '@storybook/react';

import { deepMerge } from 'mnet-ui-base/utils';

import {
  mnet,
  Anchor,
  Box,
  Button,
  MnetUIBase,
  Menu,
  Text,
  TextInput,
} from 'mnet-ui-base';

const customFocus = deepMerge(mnet, {
  global: {
    colors: {
      focus: 'neutral-3',
    },
  },
});

const CustomDefaultProps = () => (
  <MnetUIBase theme={customFocus}>
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
  </MnetUIBase>
);

storiesOf('Theme', module).add('Focus', () => <CustomDefaultProps />);
