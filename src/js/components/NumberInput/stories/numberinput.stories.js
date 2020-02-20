import { Box, Grommet, NumberInput } from 'grommet';

import React from 'react';
import { grommet } from 'grommet/themes';
import { storiesOf } from '@storybook/react';

const SimpleNumberInput = () => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <NumberInput value={value} onChange={onChange} />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('NumberInput', module).add('Simple', () => <SimpleNumberInput />);
