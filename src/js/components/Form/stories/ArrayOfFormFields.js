import React, { useState } from 'react';

import { grommet, Box, Form, Grommet, Button, FormField } from 'grommet';
import { Add, Trash } from 'grommet-icons';

export const ArrayOfFormFields = () => {
  const [values, setValues] = useState({
    name: '',
    phones: [{ number: '', ext: '' }],
  });

  const addPhone = () => {
    const newPhone = { number: '', ext: '' };
    const newPhones = [...values?.phones, newPhone];
    setValues({
      ...values,
      phones: newPhones,
    });
  };

  const removePhone = (index) => {
    if (values.phones && values.phones.length > 0) {
      setValues({
        ...values,
        phones: values.phones.filter((v, _idx) => _idx !== index),
      });
    }
  };

  const handleFormChange = (newFormState) => {
    console.log({ newFormState });
    if (newFormState) {
      setValues(newFormState);
    }
  };
  let PhoneNumberGroup = null;
  if (values.phones !== undefined) {
    PhoneNumberGroup = values.phones.map((phone, index) => (
      <Box
        key={`${index}`}
        direction="row"
        justify="between"
        align="center"
      >
        <FormField
          label="Phone Number"
          name={`phones[${index}].number`}
          required
          validate={[
            { regexp: /^[0-9]*$/ },
            (number) => {
              if (number && number.length > 10) return 'Only 10 numbers';
              return undefined;
            },
          ]}
        />
        <FormField
          label="Extension"
          name={`phones[${index}].ext`}
          validate={[
            { regexp: /^[0-9]*$/ },
            (ext) => {
              if (ext && ext.length > 3) return 'Only 3 numbers';
              return undefined;
            },
          ]}
        />
        <Box>
          <Button
            icon={<Trash />}
            label="Remove"
            plain
            hoverIndicator
            onClick={() => removePhone(index)}
          />
        </Box>
      </Box>
    ));
  }

  return (
    <Grommet theme={grommet}>
      <Box pad="medium" width="large">
        <Form
          value={values}
          validate="blur"
          onReset={(event) => console.log(event)}
          onChange={handleFormChange}
          onValidate={(validationResults) => {
            console.log('validationResults = ', validationResults);
          }}
          onSubmit={() => {
            console.log('Form Submitted successfully');
          }}
        >
          <FormField
            label="Name"
            name="name"
            pad
            required
            validate={[
              { regexp: /^[a-zA-Z ]*$/ },
              (name) => {
                if (name && name.length > 5)
                  return 'Must be less than or equal to 5 alphabets only';
                return undefined;
              },
            ]}
          />
          {PhoneNumberGroup}
          <Button
            icon={<Add />}
            label="Add Number"
            plain
            hoverIndicator
            onClick={addPhone}
          />
          <Box direction="row" justify="between" margin={{ top: 'medium' }}>
            <Button label="Cancel" />
            <Button type="reset" label="Reset" />
            <Button type="submit" label="Submit" primary />
          </Box>
        </Form>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/Form/Array Of Form Fields',
};
