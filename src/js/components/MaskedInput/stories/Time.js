import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, MaskedInput } from 'mnet-ui-base';

const TimeMaskedInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
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
            onChange={event => setValue(event.target.value)}
          />
        </Box>
      </Box>
    </div>
  );
};

storiesOf('MaskedInput', module).add('Time', () => <TimeMaskedInput />);
