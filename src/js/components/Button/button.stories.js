import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../Button/Button';
import Grommet from '../Grommet/Grommet';

class SimpleButton extends Component {
  render() {
    return (
      <Grommet>
        <Button label='Submit' onClick={() => {}} {...this.props} />
      </Grommet>
    );
  }
}

const customTheme = {
  button: {
    border: {
      radius: undefined,
      color: '#2196f3',
    },
    padding: {
      vertical: '12px',
      horizontal: '24px',
    },
    colors: {
      primary: '#2196f3',
    },
    extend: (props) => {
      let extraStyles = '';
      if (props.primary) {
        extraStyles = `
          text-transform: uppercase;
        `;
      }
      return `
        color: white;

        span {
          font-size: 12px;
        }

        ${extraStyles}
      `;
    },
  },
};

class CustomThemeButton extends Component {
  render() {
    return (
      <Grommet theme={customTheme}>
        <Button label='Submit' onClick={() => {}} primary={true} />
      </Grommet>
    );
  }
}

storiesOf('Button', module)
  .add('Default', () => <SimpleButton />)
  .add('Primary', () => <SimpleButton primary={true} />)
  .add('Custom theme', () => <CustomThemeButton />);
