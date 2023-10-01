import React from 'react';
import { Box, MaskedInput } from 'grommet';
import { Grommet } from '../../Grommet';

const daysInMonth = (month) => new Date(2019, month, 0).getDate();

export const Disabled = () => {
  const [value, setValue] = React.useState('');

  return (
    <Grommet
      theme={{ global: { control: { disabled: { cursor: 'not-allowed' } } } }}
    >
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <MaskedInput
            disabled
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
                regexp:
                  /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
                placeholder: 'yyyy',
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

Disabled.storyName = 'Disabled';

Disabled.parameters = {
  chromatic: { disable: true },
};

Disabled.args = {
  full: true,
};

export default {
  title: 'Input/MaskedInput/Disabled',
};
