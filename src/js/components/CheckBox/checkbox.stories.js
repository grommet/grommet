import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Grommet, CheckBox, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { normalizeColor, deepMerge } from 'grommet/utils';

import { FormCheckmark } from 'grommet-icons';

class SimpleCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: !!props.checked };
  }

  onChange = event => this.setState({ checked: event.target.checked });

  render() {
    const { checked } = this.state;
    return (
      <Grommet theme={grommet}>
        <CheckBox
          {...this.props}
          label="Choice"
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
        light: 'neutral-1',
      },
      radius: '2px',
    },
    color: {
      light: 'neutral-1',
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
  state = { checked: false };

  onChange = event => this.setState({ checked: event.target.checked });

  render() {
    const { checked } = this.state;
    return (
      <Grommet theme={deepMerge(grommet, customCheckBoxTheme)}>
        <CheckBox
          {...this.props}
          label="Choice"
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
        light: 'light-2',
      },
    },
    color: {
      light: 'neutral-1',
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
      background: 'light-2',
      color: {
        light: 'light-4',
      },
      size: '36px',
    },
    gap: 'xsmall',
    size: '18px',
  },
};

class ThemedToggle extends Component {
  state = { checked: false };

  onChange = event => this.setState({ checked: event.target.checked });

  render() {
    const { checked } = this.state;
    return (
      <Grommet theme={deepMerge(grommet, customToggleTheme)}>
        <CheckBox
          {...this.props}
          label="Choice"
          checked={checked}
          onChange={this.onChange}
          toggle
        />
      </Grommet>
    );
  }
}

class CheckBoxInsideButton extends Component {
  state = {
    checked: false,
  };

  render() {
    const { checked } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box>
          <Button
            hoverIndicator="background"
            onClick={() => {
              this.setState({ checked: !checked });
            }}
          >
            <CheckBox
              tabIndex="-1"
              checked={checked}
              label={<Text>Hi</Text>}
              onChange={() => {}}
            />
          </Button>
        </Box>
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
  .add('Themed Toggle', () => <ThemedToggle />)
  .add('Inside a Button', () => <CheckBoxInsideButton />);
