import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, TimeInput } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  const [value, setValue] = React.useState('');
  const onChange = event => {
    const nextValue = event.value;
    console.log('onChange', nextValue);
    setValue(nextValue);
  };
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Box width="medium">
          <TimeInput format="hh:mm" value={value} onChange={onChange} />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('TimeInput', module).add('Format', () => <Example />);
