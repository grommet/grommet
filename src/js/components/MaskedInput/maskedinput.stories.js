import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import {
  Box,
  Button,
  Grommet,
  Text,
  Calendar,
  MaskedInput,
  DropButton,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { Schedule } from 'grommet-icons';

class TimeMaskedInput extends Component {
  state = { value: '' };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <MaskedInput
              mask={[
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
                  regexp: /^1[1-2]$|^[0-9]$/,
                  placeholder: 'hh',
                },
                { fixed: ':' },
                {
                  length: 2,
                  options: ['00', '15', '30', '45'],
                  regexp: /^[0-5][0-9]$|^[0-9]$/,
                  placeholder: 'mm',
                },
                { fixed: ' ' },
                {
                  length: 2,
                  options: ['am', 'pm'],
                  regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
                  placeholder: 'ap',
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

class PhoneMaskedInput extends Component {
  state = { value: '' };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <MaskedInput
              mask={[
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

class EmailMaskedInput extends Component {
  state = { value: '' };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <MaskedInput
              mask={[
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

class IPv4MaskedInput extends Component {
  state = { value: '' };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <MaskedInput
              mask={[
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

const DropContent = props => {
  const { date, onSelect, time, onClose, onChange } = props;
  return (
    <Box align="center">
      <Calendar date={date} onSelect={onSelect} showAdjacentDays={false} />
      <Box width="small" align="center" margin={{ bottom: 'small' }}>
        <MaskedInput
          mask={[
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
              regexp: /^1[1-2]$|^[0-9]$/,
              placeholder: 'hh',
            },
            { fixed: ':' },
            {
              length: 2,
              options: ['00', '15', '30', '45'],
              regexp: /^[0-5][0-9]$|^[0-9]$/,
              placeholder: 'mm',
            },
            { fixed: ' ' },
            {
              length: 2,
              options: ['am', 'pm'],
              regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
              placeholder: 'ap',
            },
          ]}
          value={time}
          name="maskedInput"
          onChange={onChange}
        />
      </Box>
      <Button margin="small" label="Close" onClick={onClose} />
    </Box>
  );
};

class TimeMaskedInputInDropButton extends Component {
  state = { date: undefined, time: '' };

  onChange = event => {
    this.setState({ time: event.target.value });
  };

  onClose = () => {
    this.setState({ open: false });
    setTimeout(() => this.setState({ open: undefined }), 1);
  };

  onSelect = date => this.setState({ date, open: false });

  render() {
    const { date, open, time } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <DropButton
            open={open}
            onClose={() => this.setState({ open: false })}
            onOpen={() => this.setState({ open: true })}
            dropContent={
              <DropContent
                onSelect={this.onSelect}
                date={date}
                onChange={this.onChange}
                time={time}
                onClose={this.onClose}
              />
            }
          >
            <Box direction="row" gap="medium" align="center" pad="small">
              <Text>
                {date
                  ? `${new Date(date).toLocaleDateString()} ${time}`
                  : 'Select date & time'}
              </Text>
              <Schedule />
            </Box>
          </DropButton>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('MaskedInput', module)
  .add('Time', () => <TimeMaskedInput />)
  .add('Phone', () => <PhoneMaskedInput />)
  .add('Email', () => <EmailMaskedInput />)
  .add('IPv4 Address', () => <IPv4MaskedInput />)
  .add('Inside Drop Button', () => <TimeMaskedInputInDropButton />);
