import React, { useState } from 'react';

import { Box, Button, Form, FormField, Grommet, Text, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';

export const InsideFormField = () => {
  const [value, setValue] = useState({ name: '', email: '', value: '' });

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Text weight="bold">TextArea as component prop of FormField</Text>
        <Form>
          <FormField
            label="FormField label"
            htmlFor="text-area"
            component={TextArea}
            placeholder="placeholder from FormField"
          />
          <Button type="submit" label="submit" />
        </Form>
      </Box>

      <Box align="center" pad="large">
        <Text weight="bold">TextArea inside FormField</Text>
        <Form
          value={value}
          onChange={nextValue => setValue(nextValue)}
          onSubmit={() => console.log(value)}
        >
          <FormField name="value" label="FormField label" required>
            <TextArea name="value" placeholder="placeholder from TextArea" />
          </FormField>
          <Button type="submit" label="submit" />
        </Form>
      </Box>
    </Grommet>
  );
};

InsideFormField.storyName = 'Inside a FormField';

export default {
  title: 'Input/TextArea/Inside a FormField',
};
