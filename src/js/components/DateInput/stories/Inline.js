import React from 'react';

import { Box, DateInput } from 'grommet';

export const Inline = () => {
  const [value, setValue] = React.useState('');
  const onChange = (event) => {
    const nextValue = event.value;
    console.log('onChange', nextValue);
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
