import React from 'react';
import { Box, MaskedInput } from 'grommet';

export const Time = () => {
  const [value, setValue] = React.useState('');

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <MaskedInput
          mask={[
            {
              length: [1, 2],
              options: Array.from({ length: 12 }, (v, k) => k + 1),
              regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
              placeholder: 'hh',
            },
            { fixed: ':' },
            {
              length: 2,
              options: ['00', '15', '30', '45'],
              regexp: /^[0-5][0-9]$|^[0-9]$/,
              placeholder: 'mm',
            },
            { fixed: ' ' },
            {
              length: 2,
              options: ['am', 'pm'],
              regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
              placeholder: 'ap',
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

Time.args = {
  full: true,
};

export default {
  title: 'Input/MaskedInput/Time',
};
