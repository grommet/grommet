import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import {
  Grommet,
  Box,
  CheckBox,
  FormField,
  Select,
  TextArea,
  TextInput,
  Form,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const allSuggestions = Array(100)
  .fill()
  .map((_, i) => `suggestion ${i + 1}`);

class FormFieldTextInput extends Component {
  state = { value: '', suggestions: allSuggestions };

  onChange = event => {
    const {
      target: { value },
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
        <Box align="center" pad="large">
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
        </Box>
      </Grommet>
    );
  }
}

const FormFieldTextArea = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Form>
        <FormField
          label="Label"
          htmlFor="text-area"
          {...props}
          component={TextArea}
          placeholder="placeholder"
        />
      </Form>
    </Box>
  </Grommet>
);

const FormFieldCheckBox = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <FormField label="Label" htmlFor="check-box" {...props}>
        <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
          <CheckBox id="check-box" label="CheckBox" />
        </Box>
      </FormField>
    </Box>
  </Grommet>
);

const FormFieldToggle = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <FormField label="Label" htmlFor="check-box" {...props}>
        <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
          <CheckBox id="check-box" label="CheckBox" toggle />
        </Box>
      </FormField>
    </Box>
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
        <Box align="center" pad="large">
          <FormField label="Label" htmlFor="select" {...this.props}>
            <Select
              id="select"
              placeholder="placeholder"
              options={options}
              value={value}
              onChange={({ option }) => this.setState({ value: option })}
            />
          </FormField>
        </Box>
      </Grommet>
    );
  }
}

const FormFieldHelpError = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <FormField
        label="Label"
        htmlFor="text-input"
        {...props}
        help="Text to help the user know what is possible"
        error="Text to call attention to an issue with this field"
      >
        <TextInput
          id="text-input"
          placeholder="placeholder"
          value="Value"
          onChange={() => {}}
        />
      </FormField>
    </Box>
  </Grommet>
);

const customFormFieldTheme = {
  global: {
    font: {
      size: '13px',
    },
    input: {
      weight: 400,
    },
  },
  formField: {
    label: {
      color: 'dark-3',
      size: 'xsmall',
      margin: { vertical: '0', bottom: 'small', horizontal: '0' },
      weight: 600,
    },
    border: false,
    margin: 0,
  },
};

const CustomFormField = () => (
  <Grommet theme={deepMerge(grommet, customFormFieldTheme)}>
    <Box align="center" pad="large">
      <FormField label="Label" htmlFor="text-area">
        <TextArea id="text-area" placeholder="placeholder" />
      </FormField>
    </Box>
  </Grommet>
);

storiesOf('FormField', module)
  .add('TextInput', () => <FormFieldTextInput />)
  .add('TextArea', () => <FormFieldTextArea />)
  .add('Select', () => <FormFieldSelect />)
  .add('CheckBox', () => <FormFieldCheckBox />)
  .add('Toggle', () => <FormFieldToggle />)
  .add('Help and error', () => <FormFieldHelpError />)
  .add('Custom Theme', () => <CustomFormField />);
