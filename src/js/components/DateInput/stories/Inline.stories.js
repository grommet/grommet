import React from 'react';

import { Box, DateInput } from 'grommet';

export const Inline = () => {
  const [value, setValue] = React.useState('');
  const onChange = (event) => {
    const nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue));
    setValue(nextValue);
  };
  return (
    <Box align="center" pad="large">
      <DateInput inline value={value} onChange={onChange} />
    </Box>
  );
};

export default {
  title: 'Input/DateInput/Inline',
};
