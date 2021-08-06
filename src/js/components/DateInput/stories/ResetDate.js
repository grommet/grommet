import React from 'react';

import { Grommet, Box, DateInput, grommet } from 'grommet';
import { Button } from '../../Button';

export const ResetDate = () => {
  const [value, setValue] = React.useState('');
  const onChange = (event) => setValue(event.value);

  return (
    <Grommet theme={grommet}>
      <Box
        direction="column"
        align="center"
        justify="center"
        pad="large"
        gap="large"
      >
        <DateInput value={value} onChange={onChange} format="mm/dd/yyyy" />
        <Button
          label="Reset Date"
          fill="vertical"
          onClick={() => setValue('')}
          type="button"
        />
      </Box>
    </Grommet>
  );
};

ResetDate.storyName = 'Reset date';

export default {
  title: 'Input/DateInput/Reset date',
};
