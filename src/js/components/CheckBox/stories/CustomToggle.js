import React, { useState } from 'react';

import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customToggleTheme = {
  global: {
    colors: {
      'toggle-bg': '#757575',
      'toggle-checked-border': '#2196f3',
      'toggle-knob': 'white',
      'toggle-accent': 'accent-2',
      'toggle-checked-accent': '#2196f3',
    },
  },
  checkBox: {
    hover: {
      border: undefined,
    },
    toggle: {
      container: {
        background: { light: 'toggle-accent' },
        checked: {
          background: { light: 'toggle-checked-accent' },
          border: {
            color: 'toggle-checked-border',
          },
        },
        border: {
          color: {
            light: 'toggle-bg',
          },
        },
        hover: {
          border: undefined,
        },
        size: '36px',
        height: '14px',
        gap: 'xsmall',
      },
      knob: {
        color: {
          light: 'toggle-knob',
        },
        size: '18px',
        elevation: 'small',
        extend: `
          top: -4px;
        `,
        checked: {
          color: {
            light: 'toggle-knob',
          },
        },
      },
    },
  },
};

export const CustomToggle = (props) => {
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

CustomToggle.storyName = 'Custom toggle';

export default {
  title: 'Input/CheckBox/Custom toggle',
};
