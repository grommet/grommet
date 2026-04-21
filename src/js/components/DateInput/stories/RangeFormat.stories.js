import React from 'react';

import { Box, DateInput } from 'grommet';

export const RangeFormat = () => {
  const [value, setValue] = React.useState([
    '2020-07-31T15:24:26.256Z',
    '2020-08-07T15:24:26.256Z',
  ]);
  const onChange = (event) => {
    const nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log(
      'onChange utc date:',
      new Date(nextValue[0]),
      new Date(nextValue[1]),
    );
    setValue(nextValue);
  };
  return (
    <Box align="center" pad="large">
      <Box width="medium">
        <DateInput
          value={value}
          format="mm/dd/yyyy-mm/dd/yyyy"
          onChange={onChange}
        />
      </Box>
    </Box>
  );
};

RangeFormat.storyName = 'Range format';

export default {
  title: 'Input/DateInput/Range format',
};
