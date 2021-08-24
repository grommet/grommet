import React from 'react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const CustomBoxMaskedInput = () => {
  const [value, setValue] = React.useState('');
  const [dropProps, setDropProps] = React.useState({});
  const boxRef = React.useRef();

  // Update the DropProps target once ref exists
  React.useEffect(() => {
    const nextDropProps = { ...dropProps };
    nextDropProps.target = boxRef.current;
    setDropProps(nextDropProps);
  }, [boxRef]);

  return (
    <Grommet full theme={grommet}>
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
            dropProps={dropProps}
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
    </Grommet>
  );
};

CustomBoxMaskedInput.storyName = 'Custom box';

CustomBoxMaskedInput.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/MaskedInput/Custom box',
};
