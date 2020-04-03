import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  grommet,
  Box,
  Button,
  Form,
  FormField,
  CheckBox,
  Grommet,
} from 'grommet';

const FormFieldCheckBox = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Form>
        <FormField label="Label" name="checkbox" htmlFor="check-box" required>
          <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
            <CheckBox id="check-box" name="checkbox" label="CheckBox" />
          </Box>
        </FormField>
        <Button type="submit" label="Submit" />
      </Form>
    </Box>
  </Grommet>
);

storiesOf('Form', module).add('CheckBox', () => <FormFieldCheckBox />);
