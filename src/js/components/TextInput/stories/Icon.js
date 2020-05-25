import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, MnetUIBase, TextInput } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';
import { Search } from 'grommet-icons';

const IconTextInput = () => {
  return (
    <MnetUIBase full theme={mnet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium" gap="medium">
          <TextInput icon={<Search />} placeholder="search ..." />
          <TextInput icon={<Search />} reverse placeholder="search ..." />
        </Box>
      </Box>
    </MnetUIBase>
  );
};

storiesOf('TextInput', module).add('Icon', () => <IconTextInput />);
