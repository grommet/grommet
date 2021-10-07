import React from 'react';

import { Box, DateInput, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

export const European = () => {
  const [value, setValue] = React.useState();
  const onChange = event => {
    const nextValue = event.value;
    console.log('onChange', nextValue);
    setValue(nextValue);
  };
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium" gap="medium">
          <DateInput format="dd/mm/yyyy" value={value} onChange={onChange} />
        </Box>
      </Box>
    </Grommet>
  );
};

European.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/DateInput/European',
};
