import React, { useState } from 'react';

import { Box, TextArea } from 'grommet';

export const Fill = () => {
  const [value, setValue] = useState('');

  const onChange = (event) => setValue(event.target.value);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box
      width="large"
      height="medium"
      border={{ color: 'brand', size: 'medium' }}
    >
      <TextArea value={value} onChange={onChange} fill />
    </Box>
    // </Grommet>
  );
};

Fill.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TextArea/Fill',
};
