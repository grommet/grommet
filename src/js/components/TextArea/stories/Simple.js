import React, { useState } from 'react';

import { Box, Grommet, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';

const Resize = props => {
  const [value, setValue] = useState('');

  const onChange = event => setValue(event.target.value);

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <TextArea value={value} onChange={onChange} {...props} />
      </Box>
    </Grommet>
  );
};

export const Simple = () => <Resize resize />;

export default {
  title: 'Input/TextArea/Simple',
};
