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
        light: css`${props => colorForName('brand', props.theme)}`,
      },
      radius: '2px',
    },
    box: {
      extend: ({ theme, checked }) => `
        ${checked && `background-color: ${colorForName('brand', theme)};`}
      `,
    },
    check: {
      color: {
        light: css`${props => colorForName('brand', props.theme)}`,
      },
    },
    container: {
      extend: `
        color: #9C9C9C;
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

storiesOf('CheckBox', module)
  .add('Simple', () => <SimpleCheckBox />)
  .add('Toggle', () => <SimpleCheckBox toggle />)
  .add('Reverse', () => <SimpleCheckBox reverse />)
  .add('Themed', () => <ThemedCheckBox />);
