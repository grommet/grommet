import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, TimeInput, Form, FormField, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  const [value, setValue] = React.useState({ value: new Date().toISOString() });
  const onChange = nextValue => {
    console.log('onChange', nextValue);
    setValue(nextValue);
  };
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Form
          value={value}
          onChange={onChange}
          onSubmit={({ value: nextValue }) => console.log(nextValue)}
        >
          <FormField name="value" label="value" required>
            <TimeInput
              name="value"
              format="hh:mm"
              onChange={v => onChange({ value: v })}
            />
          </FormField>
          <Button type="submit" label="submit" />
        </Form>
      </Box>
    </Grommet>
  );
};

storiesOf('TimeInput', module).add('Form', () => <Example />);
