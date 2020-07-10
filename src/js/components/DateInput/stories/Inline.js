import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DateInput } from 'grommet';
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
        <DateInput inline value={value} onChange={onChange} />
      </Box>
    </Grommet>
  );
};

storiesOf('DateInput', module).add('Inline', () => <Example />);
