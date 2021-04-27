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
            value={value}
            onChange={event => setValue(event.target.value)}
            placeholder="$5.55"
          />
        </Box>
      </Box>
    </Grommet>
  );
};

SimpleCurrencyInput.storyName = 'Simple';

SimpleCurrencyInput.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/CurrencyInput/Simple',
};
