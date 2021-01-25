import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Grommet,
  MaskedInput,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextArea,
  TextInput,
} from 'grommet';
import { grommet } from 'grommet/themes';

export const ControlledInputLazy = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [ampm, setAmpm] = useState('');
  const [size, setSize] = useState('');
  const [comments, setComments] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    setName('initial');
    setEmail('initial@my.com');
    setSubscribe(true);
    setAmpm('evening');
    setSize('large');
    setComments('initial');
    setAge(60);
  }, []);

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
            onChange={value => console.log('Change', value)}
            onReset={() => {
              setName('');
              setEmail('');
              setSubscribe(false);
              setAmpm('');
              setSize('');
              setComments('');
              setAge('');
            }}
            onSubmit={event =>
              console.log('Submit', event.value, event.touched)
            }
          >
            <FormField label="Name" name="name">
              <TextInput
                name="name"
                value={name}
                onChange={event => setName(event.target.value)}
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
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </FormField>
            <FormField name="subscribe">
              <CheckBox
                name="subscribe"
                label="Subscribe?"
                checked={subscribe}
                onChange={event => setSubscribe(event.target.checked)}
              />
            </FormField>
            <FormField name="ampm">
              <RadioButtonGroup
                name="ampm"
                options={['morning', 'evening']}
                value={ampm}
                onChange={event => setAmpm(event.target.value)}
              />
            </FormField>
            <FormField label="Size" name="size">
              <Select
                name="size"
                options={['small', 'medium', 'large']}
                value={size}
                onChange={event => setSize(event.option)}
              />
            </FormField>
            <FormField label="Comments" name="comments">
              <TextArea
                name="comments"
                value={comments}
                onChange={event => setComments(event.target.value)}
              />
            </FormField>
            <FormField label="Age" name="age" pad>
              <RangeInput
                name="age"
                min={15}
                max={75}
                value={age}
                onChange={event => setAge(event.target.value)}
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

ControlledInputLazy.storyName = 'Controlled input lazy';

export default {
  title: 'Input/Form/Controlled input lazy',
};
