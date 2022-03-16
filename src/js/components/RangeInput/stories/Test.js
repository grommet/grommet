import React from 'react';

import { Box, FormField, Button, RangeInput } from 'grommet';

export const Test = () => {
  const [value, setValue] = React.useState(5);

  const onChange = (event) => setValue(event.target.value);

  return (
    <Box align="center" pad="large">
        <RangeInput value={value} onChange={onChange} />

        <FormField fill label="Age" name="age">
            <RangeInput name="age" min={15} max={75} />
        </FormField>
    </Box>
  );
};

export default {
  title: 'Input/RangeInput/Test',
};
