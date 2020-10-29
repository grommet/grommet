import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Form, FormField, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  const [value, setValue] = React.useState({ value: '' });
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
          onSubmit={({ value: nextValue }) => {
            console.log(nextValue);
            setValue({ value: '' });
          }}
        >
          <FormField name="value" label="url" required>
            <MaskedInput
              name="value"
              mask={[{ fixed: 'https://' }, { regexp: /^.*$/ }]}
            />
          </FormField>
          <Button type="submit" label="submit" />
        </Form>
      </Box>
    </Grommet>
  );
};

storiesOf('MaskedInput', module).add('Form', () => <Example />);
