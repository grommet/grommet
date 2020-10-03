import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, TimeInput, Text } from 'grommet';
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
      <Box direction="row" align="center" justify="center" pad="large">
        <Text weight="bold">
          {value && new Date(value).toLocaleDateString()}
        </Text>
        <TimeInput value={value} onChange={onChange} />
      </Box>
    </Grommet>
  );
};

storiesOf('TimeInput', module).add('Simple', () => <Example />, {
  chromatic: { disable: true },
});
