import React from 'react';

import { Grommet, Box, DateInput, grommet } from 'grommet';
import { Button } from '../../Button';

const DATE = '2020-07-02T00:00:00-08:00';
const DATES = ['2020-07-02T00:00:00-08:00', '2020-07-07T00:00:00-08:00'];

export const ResetDateWithString = () => {
  const [value, setValue] = React.useState(DATE);
  const onChange = (event) => setValue(event.value);

  return (
    <Grommet theme={grommet}>
      <Box
        direction="column"
        align="center"
        justify="center"
        pad="large"
        gap="large"
      >
        <DateInput value={value} onChange={onChange} format="mm/dd/yyyy" />
        <Button
          label="Reset Date"
          fill="vertical"
          onClick={() => setValue('')}
          type="button"
        />
      </Box>
    </Grommet>
  );
};

export const ResetDateWithArray = () => {
  const [value, setValue] = React.useState(DATES);
  const onChange = (event) => setValue(event.value);

  return (
    <Grommet theme={grommet}>
      <Box
        direction="column"
        align="center"
        justify="center"
        pad="large"
        gap="large"
      >
        <DateInput value={value} onChange={onChange} format="mm/dd/yyyy" />
        <Button
          label="Reset Date"
          fill="vertical"
          onClick={() => setValue([])}
          type="button"
        />
      </Box>
    </Grommet>
  );
};



ResetDateWithString.storyName = 'Reset date with string';
ResetDateWithArray.storyName = "Reset date with array";

export default {
  title: 'Input/DateInput/Reset date',
};
