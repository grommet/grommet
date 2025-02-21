import React from 'react';

import { Box, DateInput, Text } from 'grommet';

export const Simple = () => {
  const [value, setValue] = React.useState('');
  const onChange = (event) => {
    const nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue));
    setValue(nextValue);
  };
  return (
    <Box direction="row" align="center" justify="center" pad="large">
      <Text weight="bold">{value && new Date(value).toLocaleDateString()}</Text>
      <DateInput value={value} onChange={onChange} />
    </Box>
  );
};

Simple.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/DateInput/Simple',
};
