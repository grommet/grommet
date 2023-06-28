import React from 'react';

import { DateInput, Form, TextInput, Button } from 'grommet';

export const Simple = () => (
  <>
    <Form
      onChange={(value) => {
        console.log(JSON.stringify(value));
      }}
      onReset={(e) => {
        console.log('my reset');
        e.stopPropagation();
      }}
    >
      <DateInput format="mm/dd/yyyy" name="date" />
      <TextInput name="text" />
      <Button label="clear" type="reset" />
    </Form>

    <Form
      onChange={(value) => {
        console.log(JSON.stringify(value));
      }}
    >
      <DateInput format="mm/dd/yyyy" name="date-2" />
      <TextInput name="text-2" />
      <Button label="clear" type="reset" />
    </Form>
  </>
);

Simple.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/DateInput/Simple',
};
