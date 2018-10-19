import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { css } from 'styled-components';

import { Box, Grommet, RadioButton } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge, normalizeColor } from 'grommet/utils';

class SimpleRadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: props.selected };
  }

  onChange = event => this.setState({ selected: event.target.value })

  render() {
    const { selected } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box gap='small'>
          <RadioButton
            label='Choice 1'
            name='radio'
            value='c1'
            checked={selected === 'c1'}
            onChange={this.onChange}
            {...this.props}
          />
          <RadioButton
            label='Choice 2'
            name='radio'
            value='c2'
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
        color: css`${props => normalizeColor('dark-4', props.theme)}`,
      },
    },
    check: {
      color: {
        light: css`${props => normalizeColor('neutral-1', props.theme)}`,
      },
    },
    icon: {
      size: '10px',
    },
  },
});

class CustomRadioButton extends Component {
  state = { selected: undefined }

  onChange = event => this.setState({ selected: event.target.value })

  render() {
    const { selected } = this.state;
    return (
      <Grommet theme={customTheme}>
        <Box gap='xsmall'>
          <RadioButton
            label='Choice 1'
            name='radio'
            value='c1'
            checked={selected === 'c1'}
            onChange={this.onChange}
          />
          <RadioButton
            label='Choice 2'
            name='radio'
            value='c2'
            checked={selected === 'c2'}
            onChange={this.onChange}
          />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('RadioButton', module)
  .add('Simple RadioButton', () => <SimpleRadioButton />)
  .add('Disabled RadioButton', () => <SimpleRadioButton disabled selected='c2' />)
  .add('Custom Theme', () => <CustomRadioButton />);
