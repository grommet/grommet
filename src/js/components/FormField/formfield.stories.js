import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import FormField from '../FormField/FormField';
import Grommet from '../Grommet/Grommet';
import TextInput from '../TextInput/TextInput';
import TextArea from '../TextArea/TextArea';
import Select from '../Select/Select';
import CheckBox from '../CheckBox/CheckBox';
import Box from '../Box/Box';

const suggestions = Array(100).fill().map((_, i) => `suggestion ${i + 1}`);

class FormFieldTextInput extends Component {
  state = { value: '' }

  onChange = event => this.setState({ value: event.target.value })

  onSelect = event => this.setState({ value: event.suggestion })

  render() {
    const { value } = this.state;
    return (
      <Grommet>
        <FormField label='Label' {...this.props}>
          <TextInput
            placeholder='placeholder'
            value={value}
            onChange={this.onChange}
            onSelect={this.onSelect}
            suggestions={suggestions}
          />
        </FormField>
      </Grommet>
    );
  }
}

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
