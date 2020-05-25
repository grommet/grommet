import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, MaskedInput } from 'mnet-ui-base';

const IPv4ElementExp = /^[0-1][0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$|^[0-9][0-9]$|^[0-9]$/;

const IPv4MaskedInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
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
            onChange={event => setValue(event.target.value)}
          />
        </Box>
      </Box>
    </div>
  );
};

storiesOf('MaskedInput', module).add('IPv4 Address', () => <IPv4MaskedInput />);
