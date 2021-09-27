import React from 'react';

import {
  Box,
  Form,
  Grommet,
  DateInput,
  FormField,
  Button,
  TextInput,
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';

export const Test = () => {
  const [value, setValue] = React.useState([]);
  const [value1, setValue1] = React.useState('');

  const onChange = (event) => {
    const nextValue = event.value;
    console.log('onChange in Test', nextValue);
    setValue(nextValue);
  };

  return (
    <Grommet theme={hpe}>
      <Box pad="small">
        <Form>
          <FormField>
            <DateInput
              value={value}
              format="mm/dd/yyyy-mm/dd/yyyy"
              onChange={onChange}
            />
          </FormField>
          <FormField>
            <TextInput value={value1} />
          </FormField>
          <Button
            type="submit"
            label="Change Date"
            primary
            onClick={() => {
              setValue([
                '2020-07-31T15:24:26.256Z',
                '2020-08-07T15:24:26.256Z',
              ]);
              setValue1('Text Value');
            }}
          />
        </Form>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/DateInput/Test',
};
