import React from 'react';
import { Box, MaskedInput } from 'grommet';

export const SizeUnitsMaskedInput = () => {
  const [value, setValue] = React.useState('');

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <MaskedInput
          mask={[
            {
              length: [1, 4],
              options: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
              regexp: /^\d{1,4}$/,
              placeholder: 'nnn',
            },
            { fixed: ' ' },
            {
              length: 2,
              options: ['MB', 'GB', 'TB'],
              regexp: /^[mgt]b$|^[MGT]B$|^[mMgGtT]$/,
              placeholder: 'gb',
            },
          ]}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Box>
    </Box>
    // </Grommet>
  );
};

SizeUnitsMaskedInput.storyName = 'Size + units';

SizeUnitsMaskedInput.parameters = {
  chromatic: { disable: true },
};

SizeUnitsMaskedInput.args = {
  full: true,
};

export default {
  title: 'Input/MaskedInput/Size + units',
};
