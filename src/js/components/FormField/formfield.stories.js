import React from 'react';
import { storiesOf } from '@storybook/react';

import FormField from '../FormField/FormField';
import Grommet from '../Grommet/Grommet';
import TextInput from '../TextInput/TextInput';
import TextArea from '../TextArea/TextArea';
import Select from '../Select/Select';
import CheckBox from '../CheckBox/CheckBox';
import Box from '../Box/Box';

const FormFieldTextInput = props => (
  <Grommet>
    <FormField label='Label' {...props}>
      <TextInput placeholder='placeholder' />
    </FormField>
  </Grommet>
);

const FormFieldTextArea = props => (
  <Grommet>
    <FormField label='Label' {...props}>
      <TextArea placeholder='placeholder' />
    </FormField>
  </Grommet>
);

const FormFieldCheckBox = props => (
  <Grommet>
    <FormField label='Label' {...props}>
      <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
        <CheckBox label='CheckBox' />
      </Box>
    </FormField>
  </Grommet>
);

const FormFieldToggle = props => (
  <Grommet>
    <FormField label='Label' {...props}>
      <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
        <CheckBox label='CheckBox' toggle={true} />
      </Box>
    </FormField>
  </Grommet>
);

const FormFieldSelect = props => (
  <Grommet>
    <FormField label='Label' {...props}>
      <Select placeholder='placeholder' options={['one', 'two']} />
    </FormField>
  </Grommet>
);

const FormFieldHelpError = props => (
  <Grommet>
    <FormField
      label='Label'
      {...props}
      help='Text to help the user know what is possible'
      error='Text to call attention to an issue with this field'
    >
      <TextInput placeholder='placeholder' value='Value' />
    </FormField>
  </Grommet>
);

storiesOf('FormField', module)
  .add('TextInput', () => <FormFieldTextInput />)
  .add('TextArea', () => <FormFieldTextArea />)
  .add('Select', () => <FormFieldSelect />)
  .add('CheckBox', () => <FormFieldCheckBox />)
  .add('Toggle', () => <FormFieldToggle />)
  .add('Help and error', () => <FormFieldHelpError />);
