import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Paragraph } from '../Paragraph';
import { Grommet } from '../Grommet';
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
          <Paragraph key={size} size={size}>
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
