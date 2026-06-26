import React from 'react';
import type { Meta } from '@storybook/react';

import {
  Box,
  Button,
  Form as GrommetForm,
  FormField,
  TimeInput,
} from 'grommet';

export const Form = () => {
  const [value, setValue] = React.useState({ value: '' });

  return (
    <Box align="center" pad="large">
      <Box width="medium">
        <GrommetForm
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          onSubmit={({ value: nextValue }) => {
            setValue({ value: '' });
            return nextValue;
          }}
        >
          <FormField name="value" label="value" required>
            <TimeInput name="value" timeFormat="12hr" />
          </FormField>
          <Button type="submit" label="submit" />
        </GrommetForm>
      </Box>
    </Box>
  );
};

Form.storyName = 'Form Integration';

Form.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TimeInput',
  id: 'input-timeinput-form',
} satisfies Meta;
