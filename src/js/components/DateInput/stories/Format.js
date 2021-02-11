import React from 'react';

import { Grommet, Box, DateInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const Format = () => {
  const [value, setValue] = React.useState('');
  const onChange = event => {
    const nextValue = event.value;
    console.log('onChange', nextValue);
    setValue(nextValue);
  };
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Box width="medium">
          <DateInput format="mm/dd/yyyy" value={value} onChange={onChange} />
        </Box>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/DateInput/Format',
};
