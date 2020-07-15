import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DateInput } from 'grommet';
import { grommet } from 'grommet/themes';

const now = new Date();
const lastWeek = new Date(now);
lastWeek.setDate(lastWeek.getDate() - 7);

const dateFormat = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
});

const Example = () => {
  const [value, setValue] = React.useState([
    lastWeek.toISOString(),
    now.toISOString(),
  ]);
  const onChange = event => {
    const nextValue = event.value;
    console.log('onChange', nextValue);
    setValue(nextValue);
  };
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Box width="medium">
          <DateInput
            value={value}
            format="mm/dd/yyyy-mm/dd/yyyy"
            buttonProps={{
              label: `${dateFormat.format(
                new Date(value[0]),
              )} - ${dateFormat.format(new Date(value[1]))}`,
            }}
            onChange={onChange}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('DateInput', module).add('Range format', () => <Example />);
