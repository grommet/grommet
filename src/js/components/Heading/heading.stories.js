import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Grid, Heading } from '../';
import { grommet } from '../../themes';

const H = ({ level, size }) => (
  <Heading level={level} size={size}>
    {`Heading ${level} ${size}`}
  </Heading>
);

const Set = ({ size }) => (
  <div>
    {[1, 2, 3, 4].map(level => <H key={level} level={level} size={size} />)}
  </div>
);

class All extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Grid columns='large' gap='medium'>
          <Set size='medium' />
          <Set size='small' />
          <Set size='large' />
        </Grid>
      </Grommet>
    );
  }
}

class Color extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Heading color='accent-1'>Colored Heading</Heading>
      </Grommet>
    );
  }
}

storiesOf('Heading', module)
  .add('All', () => <All />)
  .add('Color', () => <Color />);
