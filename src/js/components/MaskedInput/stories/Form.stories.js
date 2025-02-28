import React from 'react';

import { Box, Button, Form, FormField, MaskedInput } from 'grommet';

export const MaskedInputForm = () => {
  const [value, setValue] = React.useState({ value: '' });
  const onChange = (nextValue) => {
    console.log('onChange', nextValue);
    setValue(nextValue);
  };
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
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
    // </Grommet>
  );
};

MaskedInputForm.storyName = 'Form';

export default {
  title: 'Input/MaskedInput/Form',
};
