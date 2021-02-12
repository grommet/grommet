import React from 'react';

import { Grommet, Box, Button, RadioButton } from 'grommet';
import { Ascend } from 'grommet-icons';
import { grommet } from 'grommet/themes';

export const Children = () => {
  const [selected, setSelected] = React.useState();

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large" gap="large">
        <RadioButton
          name="name"
          value="option 1"
          checked={selected === 'option 1'}
          onChange={event => setSelected(event.target.value)}
        >
          {({ checked }) => (
            <Ascend color={checked ? 'brand' : 'status-unknown'} />
          )}
        </RadioButton>

        <Button label="clear" onClick={() => setSelected(undefined)} />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/RadioButton/Children',
};
