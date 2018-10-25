import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, CheckBox, FormField, Select, TextArea, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

const allSuggestions = Array(100)
  .fill()
  .map((_, i) => `suggestion ${i + 1}`);

class FormFieldTextInput extends Component {
  state = { value: '', suggestions: allSuggestions };

  onChange = event => {
    const {
      taget: { value },
    } = event;
    const exp = new RegExp(value, 'i');
    const suggestions = allSuggestions.filter(s => exp.test(s));
    this.setState({ value, suggestions });
  };

  onSelect = event => this.setState({ value: event.suggestion });

  render() {
    const { value, suggestions } = this.state;
    return (
      <Grommet theme={grommet}>
        <FormField label="Label" htmlFor="text-input" {...this.props}>
          <TextInput
            id="text-input"
            placeholder="placeholder"
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
  <Grommet theme={grommet}>
    <FormField label="Label" htmlFor="text-area" {...props}>
      <TextArea id="text-area" placeholder="placeholder" />
    </FormField>
  </Grommet>
);

const FormFieldCheckBox = props => (
  <Grommet theme={grommet}>
    <FormField label="Label" htmlFor="check-box" {...props}>
      <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
        <CheckBox id="check-box" label="CheckBox" />
      </Box>
    </FormField>
  </Grommet>
);

const FormFieldToggle = props => (
  <Grommet theme={grommet}>
    <FormField label="Label" htmlFor="check-box" {...props}>
      <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
        <CheckBox id="check-box" label="CheckBox" toggle />
      </Box>
    </FormField>
  </Grommet>
);

const allOptions = Array(100)
  .fill()
  .map((_, i) => `option ${i + 1}`);

class FormFieldSelect extends Component {
  state = { value: '', options: allOptions };

  render() {
    const { value, options } = this.state;
    return (
      <Grommet theme={grommet}>
        <FormField label="Label" htmlFor="select" {...this.props}>
          <Select id="select" placeholder="placeholder" options={options} value={value} onChange={({ option }) => this.setState({ value: option })} />
        </FormField>
      </Grommet>
    );
  }
}

const FormFieldHelpError = props => (
  <Grommet theme={grommet}>
    <FormField
      label="Label"
      htmlFor="text-input"
      {...props}
      help="Text to help the user know what is possible"
      error="Text to call attention to an issue with this field"
    >
      <TextInput id="text-input" placeholder="placeholder" value="Value" onChange={() => {}} />
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
