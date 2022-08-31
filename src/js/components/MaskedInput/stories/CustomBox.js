import React from 'react';
import { Box, MaskedInput } from 'grommet';

export const CustomBoxMaskedInput = () => {
  const [value, setValue] = React.useState('');
  const boxRef = React.useRef();

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box
      direction="row"
      align="center"
      pad={{ horizontal: 'xsmall' }}
      border="all"
      ref={boxRef}
      wrap
    >
      <span role="img" aria-label="Disk size">
        💾
      </span>
      <Box flex width="medium" gap="medium">
        <MaskedInput
          plain
          dropProps={{ target: boxRef.current }}
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

CustomBoxMaskedInput.storyName = 'Custom box';

CustomBoxMaskedInput.parameters = {
  chromatic: { disable: true },
};

CustomBoxMaskedInput.args = {
  full: true,
};

export default {
  title: 'Input/MaskedInput/Custom box',
};
