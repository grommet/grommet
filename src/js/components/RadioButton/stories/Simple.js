import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Button, RadioButton } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleRadioButton = () => {
  const [selected, setSelected] = React.useState();

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large" gap="large">
        <RadioButton
          label="option 1"
          name="name"
          value="option 1"
          checked={selected === 'option 1'}
          onChange={event => setSelected(event.target.value)}
        />

        <Button label="clear" onClick={() => setSelected(undefined)} />
      </Box>
    </Grommet>
  );
};

storiesOf('RadioButton', module).add('Simple', () => <SimpleRadioButton />);
