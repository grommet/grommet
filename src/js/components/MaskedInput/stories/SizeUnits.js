import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';

const SizeUnitsMaskedInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <Grommet full theme={grommet}>
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
            onChange={event => setValue(event.target.value)}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('MaskedInput', module).add('Size + Units', () => (
  <SizeUnitsMaskedInput />
));
