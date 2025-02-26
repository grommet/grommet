import React from 'react';
import { Box, MaskedInput } from 'grommet';

const IPv4ElementExp =
  /^[0-1][0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$|^[0-9][0-9]$|^[0-9]$/;

export const IPv4MaskedInput = () => {
  const [value, setValue] = React.useState('');

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <MaskedInput
          mask={[
            {
              length: [1, 3],
              regexp: IPv4ElementExp,
              placeholder: 'xxx',
            },
            { fixed: '.' },
            {
              length: [1, 3],
              regexp: IPv4ElementExp,
              placeholder: 'xxx',
            },
            { fixed: '.' },
            {
              length: [1, 3],
              regexp: IPv4ElementExp,
              placeholder: 'xxx',
            },
            { fixed: '.' },
            {
              length: [1, 3],
              regexp: IPv4ElementExp,
              placeholder: 'xxx',
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

IPv4MaskedInput.storyName = 'IPv4 address';

IPv4MaskedInput.parameters = {
  chromatic: { disable: true },
};

IPv4MaskedInput.args = {
  full: true,
};

export default {
  title: 'Input/MaskedInput/IPv4 address',
};
