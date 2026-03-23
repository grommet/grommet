import React from 'react';

import { Hide, View } from 'grommet-icons';
import { Box, Button, TextInput } from 'grommet';

export const Password = () => {
  const [value, setValue] = React.useState('');
  const [reveal, setReveal] = React.useState(false);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box
      width="medium"
      direction="row"
      margin="large"
      align="center"
      round="small"
      border
    >
      <TextInput
        plain
        type={reveal ? 'text' : 'password'}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label="Input Password"
      />
      <Button
        icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
        onClick={() => setReveal(!reveal)}
      />
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Input/TextInput/Password',
};
