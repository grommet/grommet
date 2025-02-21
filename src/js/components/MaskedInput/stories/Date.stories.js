import React from 'react';
import { Box, MaskedInput } from 'grommet';

const daysInMonth = (month) => new Date(2019, month, 0).getDate();

export const DateMaskedInput = () => {
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
    // </Grommet>
  );
};

DateMaskedInput.storyName = 'Date';

DateMaskedInput.parameters = {
  chromatic: { disable: true },
};

DateMaskedInput.args = {
  full: true,
};

export default {
  title: 'Input/MaskedInput/Date',
};
