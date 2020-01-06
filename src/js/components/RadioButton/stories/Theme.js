import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, Button, RadioButton } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';
import { deepMerge } from 'mnet-ui-base/utils';

const theme = deepMerge(mnet, {
  radioButton: {
    gap: 'xsmall',
    size: '18px',
    hover: {
      border: {
        color: 'dark-3',
      },
    },
    check: {
      color: {
        light: 'neutral-1',
      },
    },
    icon: {
      size: '10px',
    },
  },
});

const ThemeRadioButton = () => {
  const [selected, setSelected] = React.useState();

  return (
    <MnetUIBase theme={theme}>
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
    </MnetUIBase>
  );
};

storiesOf('RadioButton', module).add('Theme', () => <ThemeRadioButton />);
