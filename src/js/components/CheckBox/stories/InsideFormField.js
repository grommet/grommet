import React from 'react';

import {
  Box,
  Button,
  CheckBox,
  CheckBoxGroup,
  Form,
  FormField,
  Grommet,
} from 'grommet';
import { grommet } from 'grommet/themes';

export const InsideFormField = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Form
        onSubmit={({ value, touched }) => console.log('Submit', value, touched)}
      >
        <FormField
          label="Toggle"
          name="toggle"
          htmlFor="check-box-toggle"
          {...props}
        >
          <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
            <CheckBox
              id="check-box-toggle"
              name="toggle"
              label="CheckBox"
              toggle
            />
          </Box>
        </FormField>
        <FormField label="Default" name="checkbox" htmlFor="check-box" required>
          <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
            <CheckBox id="check-box" name="checkbox" label="Required" />
          </Box>
        </FormField>
        <FormField
          label="Where would you like to visit"
          name="checkboxgroup"
          htmlFor="check-box-group"
          required
        >
          <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
            <CheckBoxGroup
              id="check-box-group"
              name="checkboxgroup"
              options={['Maui', 'Jerusalem', 'Wuhan']}
            />
          </Box>
        </FormField>
        <Button type="submit" label="Submit" />
      </Form>
    </Box>
  </Grommet>
);

InsideFormField.storyName = 'Inside a FormField';

export default {
  title: 'Input/CheckBox/Inside a FormField',
};
