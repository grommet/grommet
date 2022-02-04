import React from 'react';

import { Box, RangeInput } from 'grommet';

export const Simple = () => {
  const [value, setValue] = React.useState(5);

  const onChange = (event) => setValue(event.target.value);

  return (
    <Box align="center" pad="large">
      <RangeInput valueX={value} onChange={onChange} />
    </Box>
  );
};

export default {
  title: 'Input/RangeInput/Simple',
};
