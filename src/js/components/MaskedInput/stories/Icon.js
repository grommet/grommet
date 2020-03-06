import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { Search } from 'grommet-icons';

const IconMaskedInput = () => {
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium" gap="medium">
          <MaskedInput icon={<Search />} placeholder="search ..." />
          <MaskedInput icon={<Search />} reverse placeholder="search ..." />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('MaskedInput', module).add('Icon', () => <IconMaskedInput />);
