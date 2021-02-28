import React from 'react';

import { grommet, Box, Grommet, FormField, CheckBox } from 'grommet';

export const CustomWidth = () => (
  <Grommet theme={grommet}>
    <Box pad="small" width="20%">
      <FormField name="required-field" label="Label" required>
        <CheckBox
          name="checkbox"
          id="required-field"
          label="Validation"
          toggle
          reverse
          containerWidth="50%"
        />

        <CheckBox
          name="checkbox"
          id="required-field"
          label="Validation"
          toggle
          reverse
          containerWidth="40%"
        />
      </FormField>
    </Box>
  </Grommet>
);

export default {
  title: 'Input/CheckBox/Custom Width',
};
