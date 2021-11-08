import React from 'react';

import { Box, Button, RadioButton } from 'grommet';
import { Ascend } from 'grommet-icons';

export const Children = () => {
  const [selected, setSelected] = React.useState();

  return (
    <Box align="center" pad="large" gap="large">
      <RadioButton
        name="name"
        value="option 1"
        checked={selected === 'option 1'}
        onChange={(event) => setSelected(event.target.value)}
      >
        {({ checked }) => (
          <Ascend color={checked ? 'brand' : 'status-unknown'} />
        )}
      </RadioButton>

      <Button label="clear" onClick={() => setSelected(undefined)} />
    </Box>
  );
};

export default {
  title: 'Input/RadioButton/Children',
};
