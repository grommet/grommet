import React, { useState } from 'react';

import {
  Grommet,
  Box,
  Button,
  Form,
  FormField,
  Text,
  TextInput,
  RadioButtonGroup,
} from 'grommet';

export const ValidateDisabled = () => {
  const [formValues, setFormValues] = useState({ switch: 'Enable' });
  const [validationResults, setValidationResults] = useState({});
  const updateFormFields = (newValue) => {
    // If we're disabling the field, clear what's in it
    if (newValue === 'Disable') {
      setFormValues({ firstName: 'a', switch: newValue });
    }
  };

  return (
    <Grommet full>
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
            validate="change"
            value={formValues}
            onChange={setFormValues}
            onValidate={(results) => setValidationResults(results)}
          >
            <Box gap="medium">
              <RadioButtonGroup
                name="switch"
                options={['Enable', 'Disable']}
                onChange={(event) => updateFormFields(event.target.value)}
              />
              <FormField
                label="First Name"
                name="firstName"
                required
                disabled={formValues.switch === 'Disable'}
                validate={[
                  (firstName) => {
                    if (firstName && firstName.length === 1)
                      return 'must be >1 character';
                    return undefined;
                  },
                ]}
              >
                <TextInput
                  name="firstName"
                  disabled={formValues.switch === 'Disable'}
                />
              </FormField>
            </Box>
            <Button label="Submit" type="submit" />
          </Form>
          <Text>Validation Results: {JSON.stringify(validationResults)}</Text>
          <Text>Form Values: {JSON.stringify(formValues)}</Text>
        </Box>
      </Box>
    </Grommet>
  );
};

ValidateDisabled.storyName = 'Validate disabled';

export default {
  title: 'Input/Form/Validate disabled',
};
