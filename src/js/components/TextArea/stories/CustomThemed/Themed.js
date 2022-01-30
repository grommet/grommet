import React, { useState } from 'react';

import { Box, Grommet, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(grommet, {
  textArea: {
    extend: () => `
      font-size: 40px;
      color: red;
    `,
  },
});

export const Themed = () => {
  const [value, setValue] = useState('');

  const onChange = (event) => setValue(event.target.value);

  return (
    <Grommet theme={customTheme}>
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
  title: 'Input/TextArea/Custom Themed/Themed',
};
