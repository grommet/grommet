import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { Search } from 'grommet-icons';

const IconTextInput = () => {
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium" gap="medium">
          <TextInput icon={<Search />} placeholder="search ..." />
          <TextInput icon={<Search />} reverse placeholder="search ..." />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('TextInput', module).add('Icon', () => <IconTextInput />);
