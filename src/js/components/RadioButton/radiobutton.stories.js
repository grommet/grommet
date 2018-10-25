import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Grommet, RadioButton } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

class SimpleRadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: props.selected };
  }

  onChange = event => this.setState({ selected: event.target.value });

  render() {
    const { selected } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box gap="small">
          <RadioButton
            label="Choice 1"
            name="radio"
            value="c1"
            checked={selected === 'c1'}
            onChange={this.onChange}
            {...this.props}
          />
          <RadioButton
            label="Choice 2"
            name="radio"
            value="c2"
            checked={selected === 'c2'}
            onChange={this.onChange}
            {...this.props}
          />
        </Box>
      </Grommet>
    );
  }
}

const customTheme = deepMerge(grommet, {
  radioButton: {
    gap: 'xsmall',
    size: '18px',
    hover: {
      border: {
        color: 'dark-4',
      },
    },
    check: {
      color: {
        light: 'neutral-1',
      },
    },
    icon: {
      size: '10px',
    },
  },
});

class CustomRadioButton extends Component {
  state = { selected: undefined };

  onChange = event => this.setState({ selected: event.target.value });

  render() {
    const { selected } = this.state;
    return (
      <Grommet theme={customTheme}>
        <Box gap="xsmall">
          <RadioButton
            label="Choice 1"
            name="radio"
            value="c1"
            checked={selected === 'c1'}
            onChange={this.onChange}
          />
          <RadioButton
            label="Choice 2"
            name="radio"
            value="c2"
            checked={selected === 'c2'}
            onChange={this.onChange}
          />
        </Box>
      </Grommet>
    );
  }
}

class CheckBoxInsideButton extends Component {
  state = { selected: undefined };

  render() {
    const { selected } = this.state;
    return (
      <Grommet theme={grommet}>
        <Button
          hoverIndicator="background"
          onClick={() => {
            if (selected) {
              this.setState({ selected: undefined });
            } else {
              this.setState({ selected: 'c1' });
            }
          }}
        >
          <RadioButton
            label="Choice 1"
            name="radio"
            value="c1"
            checked={selected === 'c1'}
            {...this.props}
          />
        </Button>
      </Grommet>
    );
  }
}
storiesOf('RadioButton', module)
  .add('Simple RadioButton', () => <SimpleRadioButton />)
  .add('Disabled RadioButton', () => (
    <SimpleRadioButton disabled selected="c2" />
  ))
  .add('Custom Theme', () => <CustomRadioButton />)
  .add('Inside a Button Theme', () => <CheckBoxInsideButton />);
