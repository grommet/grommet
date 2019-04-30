import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';
import { normalizeColor, deepMerge } from 'grommet/utils';

import { FormCheckmark } from 'grommet-icons';

const customCheckBoxTheme = {
  checkBox: {
    border: {
      color: {
        light: 'accent-2',
      },
      // width: 'xsmall',
      radius: '2px',
    },
    check: {
      extend: ({ theme, checked }) => `
        ${checked && `background-color: ${normalizeColor('neutral-1', theme)};`}
        `,
    },
    color: {
      light: 'neutral-3',
      dark: 'neutral-3',
    },
    gap: 'xsmall',
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
    size: '18px',
    extend: `
      color: #9C9C9C;
    `,
  },
};

class ThemedCheckBox extends Component {
  state = { checked: false };

  onChange = event => this.setState({ checked: event.target.checked });

  render() {
    const { checked } = this.state;
    return (
      <Grommet theme={deepMerge(grommet, customCheckBoxTheme)}>
        <Box align="center" pad="large">
          <CheckBox
            {...this.props}
            label="Choice"
            checked={checked}
            onChange={this.onChange}
          />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('CheckBox', module).add('Custom', () => <ThemedCheckBox />);
