import React from 'react';

import { Add, Close, StatusGood } from 'grommet-icons';

import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Layer,
  Select,
  TextInput,
} from 'grommet';

export const FormLayer = () => {
  const [open, setOpen] = React.useState(false);

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(undefined);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="center">
      <Button icon={<Add />} label="Add" onClick={onOpen} />
      {open && (
        <Layer
          position="right"
          full="vertical"
          modal
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box fill="vertical" overflow="auto" width="medium" pad="medium">
            <Form
              validate="blur"
              onReset={(event) => console.log(event)}
              onSubmit={({ value }) => console.log('Submit', value)}
            >
              <Box flex={false} direction="row" justify="between">
                <Heading level={2} margin="none">
                  Add
                </Heading>
                <Button icon={<Close />} onClick={onClose} />
              </Box>
              <FormField
                label="Name"
                aria-label="name"
                name="name"
                required
                validate={[
                  { regexp: /^[a-z]/i },
                  (name) => {
                    if (name && name.length === 1)
                      return 'must be >1 character';
                    return undefined;
                  },
                  (name) => {
                    if (name === 'good')
                      return {
                        message: (
                          <Box align="end">
                            <StatusGood />
                          </Box>
                        ),
                        status: 'info',
                      };
                    return undefined;
                  },
                ]}
              />

              <FormField label="Email" name="email" required>
                <TextInput name="email" aria-label="email" type="email" />
              </FormField>

              <FormField
                label="Size"
                name="select-size"
                htmlFor="select-size__input"
                required
                validate={(val) => {
                  if (val === 'small') {
                    return {
                      message: 'Only 10 left in stock!',
                      status: 'info',
                    };
                  }
                  return undefined;
                }}
              >
                <Select
                  name="select-size"
                  id="select-size"
                  options={['small', 'medium', 'large']}
                />
              </FormField>
              <Box flex={false} as="footer" align="start">
                <Button
                  type="submit"
                  label="Submit"
                  onClick={onClose}
                  primary
                />
              </Box>
            </Form>
          </Box>
        </Layer>
      )}
    </Box>
    // </Grommet>
  );
};

FormLayer.storyName = 'Form';

FormLayer.parameters = {
  chromatic: { disable: true },
};

FormLayer.args = {
  full: true,
};

export default {
  title: 'Layout/Layer/Form',
};
