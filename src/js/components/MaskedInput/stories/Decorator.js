import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { Search } from 'grommet-icons';

const DecoratorMaskedInput = () => {
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <MaskedInput decorator={<Search />} placeholder="search ..." />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('MaskedInput', module).add('Decorator', () => (
  <DecoratorMaskedInput />
));
