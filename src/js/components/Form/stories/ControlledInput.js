import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Box,
  Button,
  CheckBox,
  Grommet,
  Form,
  FormField,
  MaskedInput,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextArea,
  TextInput,
} from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  const [textInputValue, setTextInputValue] = React.useState();
  const [maskedInputValue, setMaskedInputValue] = React.useState();
  const [checkBoxValue, setCheckBoxValue] = React.useState();
  const [radioButtonGroupValue, setRadioButtonValue] = React.useState();
  const [selectValue, setSelectValue] = React.useState();
  const [textAreaValue, setTextAreaValue] = React.useState();
  const [rangeInputValue, setRangeInputValue] = React.useState();
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
            onReset={() => {
              setTextInputValue(undefined);
              setMaskedInputValue(undefined);
              setCheckBoxValue(undefined);
              setRadioButtonValue(undefined);
              setSelectValue(undefined);
              setTextAreaValue(undefined);
              setRangeInputValue(undefined);
            }}
            onSubmit={event => console.log('Submit', event.value)}
          >
            <FormField label="Name" name="name">
              <TextInput
                name="name"
                value={textInputValue}
                onChange={event => setTextInputValue(event.target.value)}
              />
            </FormField>
            <FormField label="Email" name="email" required>
              <MaskedInput
                name="email"
                mask={[
                  { regexp: /^[\w\-_.]+$/, placeholder: 'example' },
                  { fixed: '@' },
                  { regexp: /^[\w]+$/, placeholder: 'my' },
                  { fixed: '.' },
                  { regexp: /^[\w]+$/, placeholder: 'com' },
                ]}
                value={maskedInputValue}
                onChange={event => setMaskedInputValue(event.target.value)}
              />
            </FormField>
            <FormField name="subscribe">
              <CheckBox
                name="subscribe"
                label="Subscribe?"
                checked={checkBoxValue}
                onChange={event => setCheckBoxValue(event.target.checked)}
              />
            </FormField>
            <FormField name="ampm">
              <RadioButtonGroup
                name="ampm"
                options={['morning', 'evening']}
                value={radioButtonGroupValue}
                onChange={event => setRadioButtonValue(event.target.value)}
              />
            </FormField>
            <FormField label="Size" name="size">
              <Select
                name="size"
                options={['small', 'medium', 'large']}
                value={selectValue}
                onChange={event => setSelectValue(event.option)}
              />
            </FormField>
            <FormField label="Comments" name="comments">
              <TextArea
                name="comments"
                value={textAreaValue}
                onChange={event => setTextAreaValue(event.target.value)}
              />
            </FormField>
            <FormField label="Age" name="age" pad>
              <RangeInput
                name="age"
                min={15}
                max={75}
                value={rangeInputValue}
                onChange={event => setRangeInputValue(event.target.value)}
              />
            </FormField>
            <Box direction="row" justify="between" margin={{ top: 'medium' }}>
              <Button label="Cancel" />
              <Button type="reset" label="Reset" />
              <Button type="submit" label="Update" primary />
            </Box>
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('Form', module).add('Controlled Input', () => <Example />);
