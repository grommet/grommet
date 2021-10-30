import React from 'react';

import { Box, DateInput } from 'grommet';

export const Format = () => {
  const [value, setValue] = React.useState('');
  const onChange = (event) => {
    const nextValue = event.value;
    console.log('onChange', nextValue);
    setValue(nextValue);
  };
  return (
    <Box align="center" pad="large">
      <Box width="medium">
        <DateInput format="m/d/yy" value={value} onChange={onChange} />
      </Box>
    </Box>
  );
};

export default {
  title: 'Input/DateInput/Format',
};
