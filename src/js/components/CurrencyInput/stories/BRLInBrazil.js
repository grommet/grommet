import React from 'react';
import { Box, Grommet, CurrencyInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const SimpleCurrencyInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium" gap="small">
          <CurrencyInput
            locale="pt-BR"
            currency="BRL"
            value={value}
            onChange={event => setValue(event.target.value)}
            placeholder="R$ 5.55"
          />
          <CurrencyInput
            locale="pt-BR"
            currency="BRL"
            value={value}
            onChange={event => setValue(event.target.value)}
            placeholder="BRL 5.55"
            numberFormatOptions={{ currencyDisplay: 'code' }}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

SimpleCurrencyInput.storyName = 'BRL in Brazil';

SimpleCurrencyInput.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/CurrencyInput/BRL in Brazil',
};
