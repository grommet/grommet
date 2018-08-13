import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Paragraph from '../Paragraph/Paragraph';
import Grommet from '../Grommet/Grommet';
import { grommet } from '../../themes';

const sizes = ['xlarge', 'large', 'medium', 'small'];

const paragraphFiller = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.
`;

class All extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        {sizes.map(size => (
          <Paragraph size={size}>
            {`Paragraph ${size}`}
            {paragraphFiller}
          </Paragraph>
        ))}
        <Paragraph color='status-critical'>
          This is an error message.
        </Paragraph>
      </Grommet>
    );
  }
}

storiesOf('Paragraph', module)
  .add('All', () => <All />);
