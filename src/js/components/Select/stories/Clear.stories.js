import React, { useState } from 'react';

import { Box, Select, Grommet } from 'grommet';
import { deepMerge } from 'grommet-icons/utils';
import { hpe } from 'grommet-theme-hpe';

const customTheme = deepMerge(hpe, {
  select: {
    clear: {
      container: {
        background: undefined,
        pad: '6px',
        round: 'none',
      },
      button: {
        border: {
          radius: '6px',
        },
        pad: {
          vertical: '5px',
          horizontal: '12px',
        },
        hover: {
          background: {
            color: 'background-contrast',
          },
        },
      },
    },
    // container: {
    //   // Applying spacing on Select "Clear selection" button, then placing focus styles on the inner container div
    //   extend: () =>
    //     `
    //       button[aria-label*="Or, press"] {
    //         border-radius: 6px;
    //       }
    //     `,
    // },
  },
});

const options = [];
for (let i = 0; i < 500; i += 1) {
  options.push(`Number ${i}`);
}

const ClearTop = () => {
  const [value, setValue] = useState();
  return (
    <Grommet theme={customTheme}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          placeholder="Clear Options"
          value={value}
          multiple
          options={options}
          onChange={({ value: nextValue }) => setValue(nextValue)}
          dropHeight="large"
          clear
        />
      </Box>
    </Grommet>
  );
};

const ClearBottom = () => {
  const [value, setValue] = useState();
  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        placeholder="Clear Options"
        value={value}
        multiple
        options={options}
        onChange={({ value: nextValue }) => setValue(nextValue)}
        dropHeight="large"
        clear={{ position: 'bottom' }}
      />
    </Box>
  );
};

export const Clear = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <>
    <ClearTop />
    {/* <ClearBottom /> */}
  </>
  // </Grommet>
);

Clear.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/Select/Clear',
};
