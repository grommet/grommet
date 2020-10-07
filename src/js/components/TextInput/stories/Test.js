import React, { Component, createRef } from 'react';
import { storiesOf } from '@storybook/react';
import {
  Box,
  TextInput,
  Button,
  Form,
  Grommet,
  grommet,
  FormField,
} from 'grommet';

class Test extends Component {
  constructor() {
    super();
    this.textInput = createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  componentDidMount() {
    // this.textInput.focus()
    // focusing on mount is the standard way when using class
    // always null, does not get the updated ref
    // I assume it's because useForwardedRef is not done evaluating
    // or it's because grommet is using a custom hook
    console.log(this.textInput);
  }

  render() {
    return (
      <Grommet theme={grommet}>
        <Box align="start" width="medium" gap="small">
          <Form>
            <FormField>
              <TextInput placeholder="..." ref={this.textInput} />
            </FormField>
          </Form>
          {{
            /* This will work because we get the ref after mount */
          }}
          <Button label="click me to focus" onClick={this.focusTextInput} />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('TextInput', module).add('Test', () => <Test />);
