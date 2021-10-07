import React from 'react';

import { Hide, View } from 'grommet-icons';
import { Box, Button, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const Password = () => {
  const [value, setValue] = React.useState('');
  const [reveal, setReveal] = React.useState(false);

  return (
    <Grommet full theme={grommet}>
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
          onChange={event => setValue(event.target.value)}
        />
        <Button
          icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
          onClick={() => setReveal(!reveal)}
        />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/TextInput/Password',
};
