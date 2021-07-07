import React from 'react';

import { Grommet, Box, Button, DateInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const FormatInline = () => {
  const [value, setValue] = React.useState('');
  const onChange = (event) => {
    const nextValue = event.value;
    console.log('onChange', nextValue);
    setValue(nextValue);
  };
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large" gap="medium">
        <DateInput
          format="mm/dd/yyyy"
          inline
          value={value}
          onChange={onChange}
        />
        <Button
          label="today"
          onClick={() => setValue(new Date().toISOString())}
        />
      </Box>
    </Grommet>
  );
};

FormatInline.storyName = 'Format inline';

export default {
  title: 'Input/DateInput/Format inline',
};
