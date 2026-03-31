import React from 'react';

import { Box, TextInput } from 'grommet';

export const Simple = () => {
  const [value, setValue] = React.useState('');

  const onChange = (event) => setValue(event.target.value);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <TextInput value={value} onChange={onChange} aria-label="Input Text" />
      </Box>
    </Box>
    // </Grommet>
  );
};

Simple.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TextInput/Simple',
};
