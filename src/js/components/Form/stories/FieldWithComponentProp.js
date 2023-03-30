import React from 'react';

import {
  Box,
  Button,
  CheckBox,
  FileInput,
  Form,
  FormField,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextArea,
} from 'grommet';

export const FieldWithComponentProp = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box overflow="auto" align="center" justify="center" pad="large">
    <Box flex={false} width="medium">
      <Form
        onReset={(event) => console.log(event)}
        onSubmit={({ value, touched }) => console.log('Submit', value, touched)}
      >
        <FormField
          label="Name"
          htmlFor="name"
          id="name"
          name="name"
          required
          validate={[
            { regexp: /^[a-z]/i },
            (name) => {
              if (name && name.length === 1) return 'must be >1 character';
              return undefined;
            },
            (name) => {
              if (name && name.length <= 2)
                return { message: "that's short", status: 'info' };
              return undefined;
            },
          ]}
        />
        <FormField
          label="Email"
          htmlFor="email"
          id="email"
          name="email"
          type="email"
          required
        />
        <FormField
          label="Employee ID"
          htmlFor="employeeId"
          id="employeeId"
          name="employeeId"
          required
          validate={{ regexp: /^[0-9]{4,6}$/, message: '4-6 digits' }}
        />
        <FormField name="subscribe" component={CheckBox} label="Subscribe?" />
        <FormField
          name="ampm"
          component={RadioButtonGroup}
          options={['morning', 'evening']}
        />
        <FormField
          label="Size"
          htmlFor="size"
          id="size"
          aria-label="size"
          name="size"
          component={Select}
          onChange={(event) => console.log(event)}
          options={['small', 'medium', 'large', 'xlarge']}
        />
        <FormField
          label="Comments"
          htmlFor="comments"
          id="comments"
          name="comments"
          component={TextArea}
        />
        <FormField
          label="Age"
          htmlFor="age"
          id="age"
          name="age"
          component={RangeInput}
          pad
          min={15}
          max={75}
        />
        <FormField
          label="File"
          htmlFor="file"
          id="file"
          name="file"
          component={FileInput}
        />
        <FormField
          label="Custom"
          htmlFor="custom"
          id="custom"
          name="custom"
          component={(props) => <input {...props} />}
        />
        <Box direction="row" justify="between" margin={{ top: 'medium' }}>
          <Button label="Cancel" />
          <Button type="reset" label="Reset" />
          <Button type="submit" label="Update" primary />
        </Box>
      </Form>
    </Box>
  </Box>
  // </Grommet>
);

FieldWithComponentProp.storyName = 'Field with component prop';

FieldWithComponentProp.args = {
  full: true,
};

export default {
  title: 'Input/Form/Field with component prop',
};
