import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DateInput } from 'grommet';
import { grommet } from 'grommet/themes';

const now = new Date();
const lastWeek = new Date(now);
lastWeek.setDate(lastWeek.getDate() - 7);

const Example = () => {
  const [value, setValue] = React.useState([
    now.toISOString(),
    lastWeek.toISOString(),
  ]);
  const onChange = event => {
    const nextValue = event.target.value;
    console.log('onChange', nextValue);
    setValue(nextValue);
  };
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <DateInput value={value} onChange={onChange} />
      </Box>
    </Grommet>
  );
};

storiesOf('DateInput', module).add('Range', () => <Example />);
