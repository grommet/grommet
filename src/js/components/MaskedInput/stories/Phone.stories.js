import React from 'react';
import { Box, MaskedInput } from 'grommet';

export const Phone = () => {
  const [value, setValue] = React.useState('');

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <MaskedInput
          mask={[
            { fixed: '(' },
            {
              length: 3,
              regexp: /^[0-9]{1,3}$/,
              placeholder: 'xxx',
            },
            { fixed: ')' },
            { fixed: ' ' },
            {
              length: 3,
              regexp: /^[0-9]{1,3}$/,
              placeholder: 'xxx',
            },
            { fixed: '-' },
            {
              length: 4,
              regexp: /^[0-9]{1,4}$/,
              placeholder: 'xxxx',
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
Phone.args = {
  full: true,
};

export default {
  title: 'Input/MaskedInput/Phone',
};
