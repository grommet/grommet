import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { css } from 'styled-components';

import { Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';
import { normalizeColor, deepMerge } from 'grommet/utils';

import { FormCheckmark } from 'grommet-icons';

class SimpleCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: !!props.checked };
  }

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
        light: css`${props => normalizeColor('neutral-1', props.theme)}`,
      },
      radius: '2px',
    },
    color: {
      light: css`${props => normalizeColor('neutral-1', props.theme)}`,
    },
    check: {
      extend: ({ theme, checked }) => `
        ${checked && `background-color: ${normalizeColor('neutral-1', theme)};`}
      `,
    },
    hover: {
      border: {
        color: undefined,
      },
    },
    icon: {
      size: '18px',
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
        light: css`${props => normalizeColor('light-2', props.theme)}`,
      },
    },
    color: {
      light: css`${props => normalizeColor('neutral-1', props.theme)}`,
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
      background: css`${props => normalizeColor('light-2', props.theme)}`,
      color: {
        light: css`${props => normalizeColor('light-4', props.theme)}`,
      },
      size: '36px',
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
  .add('Disabled', () => <SimpleCheckBox checked disabled />)
  .add('Reverse', () => <SimpleCheckBox reverse />)
  .add('Themed CheckBox', () => <ThemedCheckBox />)
  .add('Themed Toggle', () => <ThemedToggle />);
