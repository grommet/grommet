import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { css } from 'styled-components';

import { Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';
import { colorForName, deepMerge } from 'grommet/utils';

import { FormCheckmark } from 'grommet-icons';

class SimpleCheckBox extends Component {
  state = { checked: false }

  onChange = event => this.setState({ checked: event.target.checked })

  render() {
    const { checked } = this.state;
    return (
      <Grommet theme={grommet}>
        <CheckBox
          {...this.props}
          label='Choice'
          checked={checked}
          onChange={this.onChange}
        />
      </Grommet>
    );
  }
}

const customCheckBoxTheme = {
  checkBox: {
    border: {
      color: {
        light: css`${props => colorForName('neutral-1', props.theme)}`,
      },
      radius: '2px',
    },
    color: {
      light: css`${props => colorForName('neutral-1', props.theme)}`,
    },
    check: {
      extend: ({ theme, checked }) => `
        ${checked && `background-color: ${colorForName('neutral-1', theme)};`}
      `,
    },
    hover: {
      border: {
        color: undefined,
      },
    },
    icon: {
      extend: 'stroke: white;',
    },
    icons: {
      checked: FormCheckmark,
    },
    gap: 'xsmall',
    size: '18px',
    extend: `
      color: #9C9C9C;
    `,
  },
};

class ThemedCheckBox extends Component {
  state = { checked: false }

  onChange = event => this.setState({ checked: event.target.checked })

  render() {
    const { checked } = this.state;
    return (
      <Grommet theme={deepMerge(grommet, customCheckBoxTheme)}>
        <CheckBox
          {...this.props}
          label='Choice'
          checked={checked}
          onChange={this.onChange}
        />
      </Grommet>
    );
  }
}

const customToggleTheme = {
  checkBox: {
    border: {
      color: {
        light: css`${props => colorForName('light-1', props.theme)}`,
      },
    },
    color: {
      light: css`${props => colorForName('neutral-1', props.theme)}`,
    },
    check: {
      radius: '2px',
    },
    hover: {
      border: {
        color: undefined,
      },
    },
    toggle: {
      background: css`${props => colorForName('light-1', props.theme)}`,
      color: {
        light: css`${props => colorForName('light-4', props.theme)}`,
      },
    },
    gap: 'xsmall',
    size: '18px',
  },
};

class ThemedToggle extends Component {
  state = { checked: false }

  onChange = event => this.setState({ checked: event.target.checked })

  render() {
    const { checked } = this.state;
    return (
      <Grommet theme={deepMerge(grommet, customToggleTheme)}>
        <CheckBox
          {...this.props}
          label='Choice'
          checked={checked}
          onChange={this.onChange}
          toggle
        />
      </Grommet>
    );
  }
}

storiesOf('CheckBox', module)
  .add('Simple', () => <SimpleCheckBox />)
  .add('Toggle', () => <SimpleCheckBox toggle />)
  .add('Reverse', () => <SimpleCheckBox reverse />)
  .add('Themed CheckBox', () => <ThemedCheckBox />)
  .add('Themed Toggle', () => <ThemedToggle />);
