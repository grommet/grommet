import React from 'react';

import { Grommet, Box, DateInput, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const Simple = () => {
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
        <DateInput value={value} onChange={onChange} />
      </Box>
    </Grommet>
  );
};

Simple.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/DateInput/Simple',
};
