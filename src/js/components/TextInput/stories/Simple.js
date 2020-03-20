import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleTextInput = () => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <TextInput value={value} onChange={onChange} />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('TextInput', module).add('Simple', () => <SimpleTextInput />);
