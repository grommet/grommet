import React from 'react';

import { Box, Button, RadioButton } from 'grommet';

export const Simple = () => {
  const [selected, setSelected] = React.useState();

  return (
    <Box align="center" pad="large" gap="large">
      <RadioButton
        label="option 1"
        name="name"
        value="option 1"
        checked={selected === 'option 1'}
        onChange={(event) => setSelected(event.target.value)}
      />

      <Button label="clear" onClick={() => setSelected(undefined)} />
    </Box>
  );
};

export default {
  title: 'Input/RadioButton/Simple',
};
