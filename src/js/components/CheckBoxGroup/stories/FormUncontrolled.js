import React from 'react';

import { Box, Button, CheckBoxGroup, Form, FormField, Heading } from 'grommet';

export const FormUncontrolled = () => (
  <Box>
    <Box pad="medium">
      <Heading level="3">Form with string options</Heading>
      <Form
        onSubmit={({ value, touched }) => console.log('Submit', value, touched)}
      >
        <FormField
          name="am-pm"
          component={CheckBoxGroup}
          options={['morning', 'evening']}
        />
        <Button type="submit" label="Submit" />
      </Form>
    </Box>
    <Box pad="medium">
      <Heading level="3">Form with object options</Heading>
      <Form
        onSubmit={({ value, touched }) =>
          console.log('Submit object options', value, touched)
        }
      >
        <FormField name="drink" label="Drink" id="drink-formfield-id">
          <CheckBoxGroup
            name="drink"
            valueKey="id"
            aria-labelledby="drink-formfield-id"
            options={[
              { label: 'Coffee', id: '1' },
              { label: 'Tea', id: '2' },
              { label: 'Milk', id: '3' },
            ]}
          />
        </FormField>
        <Button type="submit" label="Submit" />
      </Form>
    </Box>
  </Box>
);

FormUncontrolled.storyName = 'Form uncontrolled';

export default {
  title: 'Input/CheckBoxGroup/Form uncontrolled',
};
