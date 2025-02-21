import React from 'react';

import { Box, DateInput } from 'grommet';

const dateFormat = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
});

export const Range = () => {
  const [value, setValue] = React.useState([
    '2020-07-31T15:27:42.920Z',
    '2020-08-07T15:27:42.920Z',
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
      <DateInput
        value={value}
        buttonProps={{
          label: `${dateFormat.format(
            new Date(value[0]),
          )} - ${dateFormat.format(new Date(value[1]))}`,
        }}
        onChange={onChange}
      />
    </Box>
  );
};

Range.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/DateInput/Range',
};
