import * as React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import { Grommet, Box, Menu, ThemeType } from 'grommet';
import { FormUp, FormDown } from 'grommet-icons';

// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' if you are not using TypeScript.
const customBreakpoints: ThemeType = {
  global: {
    breakpoints: {
      small: {
        value: 600,
        edgeSize: {
          small: '1px',
        },
        borderSize: {
          small: '2px',
        },
        size: {
          xxsmall: '24px',
        },
      },
      medium: {
        value: 900,
        borderSize: {
          small: '2px',
        },
        edgeSize: {
          small: '1px',
        },
        size: {
          xxsmall: '24px',
        },
      },
      large: {
        value: 3000,
        borderSize: {
          small: '2px',
        },
        edgeSize: {
          small: '1px',
        },
        size: {
          xxsmall: '24px',
        },
      },
      xlarge: {
        value: 3000,
        borderSize: {
          small: '2px',
        },
        edgeSize: {
          small: '1px',
        },
        size: {
          xxsmall: '24px',
        },
      },
    },
  },
  menu: {
    icons: {
      down: FormDown,
      up: FormUp,
    },
  },
};
const App = () => {
  return (
    <Grommet theme={customBreakpoints}>
      <Box align="center" pad="large">
        <Menu
          dropProps={{ align: { top: 'bottom', left: 'left' } }}
          label="actions"
          items={[
            { label: 'Launch', onClick: () => {} },
            { label: 'Abort', onClick: () => {} },
            { label: 'Disabled', disabled: true },
          ]}
        />
      </Box>
    </Grommet>
  );
};

if (!isChromatic()) {
  storiesOf('Menu', module).add('Themed', () => <App />);
}
