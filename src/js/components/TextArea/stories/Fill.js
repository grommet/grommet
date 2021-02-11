import React, { useState } from 'react';

import { Box, Grommet, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';

export const Fill = () => {
  const [value, setValue] = useState('');

  const onChange = event => setValue(event.target.value);

  return (
    <Grommet theme={grommet}>
      <Box
        width="large"
        height="medium"
        border={{ color: 'brand', size: 'medium' }}
      >
        <TextArea value={value} onChange={onChange} fill />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/TextArea/Fill',
};
