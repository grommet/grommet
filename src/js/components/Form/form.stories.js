import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Box,
  Button,
  CheckBox,
  Grommet,
  FileInput,
  Form,
  FormField,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextArea,
} from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => (
  <Grommet full theme={grommet}>
    <Box fill overflow="auto" align="center" justify="center" pad="large">
      <Box flex={false} width="medium">
        <Form
          onReset={event => console.log(event)}
          onSubmit={({ value }) => console.log('Submit', value)}
        >
          <FormField
            label="Name"
            name="name"
            required
            validate={{ regexp: /^[a-z]/i }}
          />
          <FormField label="Email" name="email" type="email" required />
          <FormField
            label="Employee ID"
            name="employeeId"
            required
            validate={{ regexp: /^[0-9]{4,6}$/, message: '4-6 digits' }}
          />
          <FormField
            name="subscribe"
            component={CheckBox}
            pad
            label="Subscribe?"
          />
          <FormField
            name="ampm"
            component={RadioButtonGroup}
            pad
            options={['morning', 'evening']}
          />
          <FormField
            label="Size"
            name="size"
            component={Select}
            onChange={event => console.log(event)}
            options={['small', 'medium', 'large', 'xlarge']}
          />
          <FormField label="Comments" name="comments" component={TextArea} />
          <FormField
            label="Age"
            name="age"
            component={RangeInput}
            pad
            min={15}
            max={75}
          />
          <FormField label="File" name="file" component={FileInput} />
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

storiesOf('Form', module).add('All', () => <Example />);
