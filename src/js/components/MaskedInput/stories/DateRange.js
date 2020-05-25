import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, MaskedInput } from 'mnet-ui-base';

const daysInMonth = month => new Date(2019, month, 0).getDate();

const DateRangeMaskedInput = () => {
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
                placeholder: 'mm',
              },
              { fixed: '/' },
              {
                length: [1, 2],
                options: Array.from(
                  {
                    length: daysInMonth(parseInt(value.split('/')[0], 10)),
                  },
                  (v, k) => k + 1,
                ),
                regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
                placeholder: 'dd',
              },
              { fixed: '/' },
              {
                length: 4,
                options: Array.from({ length: 100 }, (v, k) => 2019 - k),
                regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
                placeholder: 'yyyy',
              },
              { fixed: ' - ' },
              {
                length: [1, 2],
                options: Array.from({ length: 12 }, (v, k) => k + 1),
                regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
                placeholder: 'mm',
              },
              { fixed: '/' },
              {
                length: [1, 2],
                options: Array.from(
                  {
                    length: daysInMonth(parseInt(value.split('/')[0], 10)),
                  },
                  (v, k) => k + 1,
                ),
                regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
                placeholder: 'dd',
              },
              { fixed: '/' },
              {
                length: 4,
                options: Array.from({ length: 100 }, (v, k) => 2019 - k),
                regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
                placeholder: 'yyyy',
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

storiesOf('MaskedInput', module).add('Date range', () => (
  <DateRangeMaskedInput />
));
