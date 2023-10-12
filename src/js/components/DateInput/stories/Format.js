import React from 'react';

import { Box, DateInput } from 'grommet';

export const Format = () => {
  const [value, setValue] = React.useState('');
  const onChange = (event) => {
    const nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue));
    setValue(nextValue);
  };
  return (
    <Box align="center" pad="large">
      <Box width="medium" margin={{ vertical: 'small' }}>
        <DateInput format="m/d/yy" value={value} onChange={onChange} />
      </Box>
      <Box width="medium" margin={{ vertical: 'small' }}>
        <DateInput format="m/d/yy" value={value} reverse onChange={onChange} />
      </Box>
    </Box>
  );
};

export default {
  title: 'Input/DateInput/Format',
};
