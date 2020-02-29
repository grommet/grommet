import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { Search } from 'grommet-icons';

const DecoratorTextInput = () => {
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <TextInput decorator={<Search />} placeholder="search ..." />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('TextInput', module).add('Decorator', () => <DecoratorTextInput />);
