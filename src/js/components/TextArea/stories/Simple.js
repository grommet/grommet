import React, { useState, useRef } from 'react';

import { Box, TextArea } from 'grommet';

const Resize = (props) => {
  const [value, setValue] = useState('');
  const ref = useRef(null);

  const onChange = (event) => setValue(event.target.value);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" pad="large">
      <TextArea
        aria-label="text area"
        value={value}
        ref={ref}
        onChange={onChange}
        {...props}
      />
    </Box>
    // </Grommet>
  );
};

export const Simple = () => <Resize resize />;

export default {
  title: 'Input/TextArea/Simple',
};
