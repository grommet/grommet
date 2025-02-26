import React from 'react';

import { Box, DateInput } from 'grommet';

export const European = () => {
  const [value, setValue] = React.useState();
  const onChange = (event) => {
    const nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue));
    setValue(nextValue);
  };
  return (
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium" gap="medium">
        <DateInput format="dd/mm/yyyy" value={value} onChange={onChange} />
      </Box>
    </Box>
  );
};

European.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/DateInput/European',
};
