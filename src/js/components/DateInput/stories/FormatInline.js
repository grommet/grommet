import React from 'react';

import { Box, Button, DateInput } from 'grommet';

export const FormatInline = () => {
  const [value, setValue] = React.useState('');
  const onChange = (event) => {
    const nextValue = event.value;
    console.log('onChange', nextValue);
    setValue(nextValue);
  };
  return (
    <Box align="center" pad="large" gap="medium">
      <DateInput format="mm/dd/yyyy" inline value={value} onChange={onChange} />
      <Button
        label="today"
        onClick={() => setValue(new Date().toISOString())}
      />
    </Box>
  );
};

FormatInline.storyName = 'Format inline';

export default {
  title: 'Input/DateInput/Format inline',
};
