import React from 'react';

import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const Simple = () => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <TextInput value={value} onChange={onChange} />
        </Box>
      </Box>
    </Grommet>
  );
};

Simple.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TextInput/Simple',
};
