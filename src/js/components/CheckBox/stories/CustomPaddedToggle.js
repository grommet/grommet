import React, { useState } from 'react';

import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customToggleTheme = {
  global: {
    colors: {
      toggleInactiveBg: '#757575',
      toggleActiveBg: '#3c50dd',
      toggleKnob: '#ffffff',
    },
  },
  checkBox: {
    toggle: {
      container: {
        background: 'toggleInactiveBg',
        size: '40px',
        height: '24px',
        checked: {
          background: 'toggleActiveBg',
        },
        pad: '4px',
        border: {
          width: '0px',
        },
      },
      knob: {
        size: '16px',
        color: 'toggleKnob',
        checked: {
          color: 'toggleKnob',
        },
      },
    },
  },
};

export const PaddedToggle = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <Grommet theme={deepMerge(grommet, customToggleTheme)}>
      <Box align="center" pad="large">
        <CheckBox
          {...props}
          label="Choice"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
          toggle
        />
      </Box>
    </Grommet>
  );
};

PaddedToggle.storyName = 'Custom padded toggle';

export default {
  title: 'Input/CheckBox/Toggle/Custom padded toggle',
};
