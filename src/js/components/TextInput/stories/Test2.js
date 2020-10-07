import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, TextInput, Form, Grommet, grommet, FormField } from 'grommet';

// This is a possible workaround for the issue.
// I'm not sure if we want to accept this as the main fix.

class Test2 extends Component {
  constructor() {
    super();
    this.state = {
      inputRef: '',
    };

    this.setInputRef = this.setInputRef.bind(this);
  }

  setInputRef(ref) {
    const { inputRef } = this.state;
    if (!inputRef) {
      this.setState({ inputRef: ref }, () => console.log(this.state));
    }
  }

  componentDidUpdate() {
    const { inputRef } = this.state;
    if (inputRef) {
      inputRef.focus();
    }
  }

  render() {
    return (
      <Grommet theme={grommet}>
        <Box align="start" width="medium" gap="small">
          <Form>
            <FormField>
              <TextInput placeholder="..." ref={ref => this.setInputRef(ref)} />
            </FormField>
          </Form>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('TextInput', module).add('Test2', () => <Test2 />);
