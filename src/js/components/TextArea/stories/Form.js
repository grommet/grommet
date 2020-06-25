import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Form, FormField, Grommet, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  const [value, setValue] = React.useState({ name: '', email: '', value: '' });

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Form
          value={value}
          onChange={nextValue => setValue(nextValue)}
          onSubmit={() => console.log(value)}
        >
          <FormField name="value" label="value" required>
            <TextArea name="value" />
          </FormField>
          <Button type="submit" label="submit" />
        </Form>
      </Box>
    </Grommet>
  );
};

storiesOf('TextArea', module).add('Form', () => <Example />);
