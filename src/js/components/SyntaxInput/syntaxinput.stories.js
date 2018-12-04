import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, SyntaxInput } from 'grommet';
import { grommet } from 'grommet/themes';

class TimeSyntaxInput extends Component {
  state = { value: '' };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="center">
          <Box width="medium">
            <SyntaxInput
              schema={[
                {
                  length: [1, 2],
                  options: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                  ],
                  placeholder: 'hh',
                },
                { fixed: ':' },
                {
                  length: 2,
                  options: ['00', '15', '30', '45'],
                  regexp: /^[0-5][0-9]$|^[0-9]$/,
                  placeholder: 'mm',
                },
              ]}
              value={value}
              onChange={this.onChange}
            />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

class PhoneSyntaxInput extends Component {
  state = { value: '' };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="center">
          <Box width="medium">
            <SyntaxInput
              schema={[
                { fixed: '(' },
                {
                  length: 3,
                  regexp: /^[0-9]{1,3}$/,
                  placeholder: 'xxx',
                },
                { fixed: ')' },
                { fixed: ' ' },
                {
                  length: 3,
                  regexp: /^[0-9]{1,3}$/,
                  placeholder: 'xxx',
                },
                { fixed: '-' },
                {
                  length: 4,
                  regexp: /^[0-9]{1,4}$/,
                  placeholder: 'xxxx',
                },
              ]}
              value={value}
              onChange={this.onChange}
            />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

class EmailSyntaxInput extends Component {
  state = { value: '' };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="center">
          <Box width="medium">
            <SyntaxInput
              schema={[
                {
                  regexp: /^[\w\-_.]+$/,
                  placeholder: 'example',
                },
                { fixed: '@' },
                {
                  regexp: /^[\w]+$/,
                  placeholder: 'my',
                },
                { fixed: '.' },
                {
                  regexp: /^[\w]+$/,
                  placeholder: 'com',
                },
              ]}
              value={value}
              onChange={this.onChange}
            />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

const IPv4ElementExp = /^[0-1][0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$|^[0-9][0-9]$|^[0-9]$/;

class IPv4SyntaxInput extends Component {
  state = { value: '' };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="center">
          <Box width="medium">
            <SyntaxInput
              schema={[
                {
                  length: [1, 3],
                  regexp: IPv4ElementExp,
                  placeholder: 'xxx',
                },
                { fixed: '.' },
                {
                  length: [1, 3],
                  regexp: IPv4ElementExp,
                  placeholder: 'xxx',
                },
                { fixed: '.' },
                {
                  length: [1, 3],
                  regexp: IPv4ElementExp,
                  placeholder: 'xxx',
                },
                { fixed: '.' },
                {
                  length: [1, 3],
                  regexp: IPv4ElementExp,
                  placeholder: 'xxx',
                },
              ]}
              value={value}
              onChange={this.onChange}
            />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('SyntaxInput', module)
  .add('Time', () => <TimeSyntaxInput />)
  .add('Phone', () => <PhoneSyntaxInput />)
  .add('Email', () => <EmailSyntaxInput />)
  .add('IPv4 Address', () => <IPv4SyntaxInput />);
