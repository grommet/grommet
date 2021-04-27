import React from 'react';
import { Box, Grommet, CurrencyInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const SimpleCurrencyInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <CurrencyInput
            locale="en-US"
            currency="BRL"
            value={value}
            onChange={event => setValue(event.target.value)}
            placeholder="R$ 5.55"
          />
        </Box>
      </Box>
    </Grommet>
  );
};

SimpleCurrencyInput.storyName = 'BRL in USA';

SimpleCurrencyInput.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/CurrencyInput/BRL in USA',
};
