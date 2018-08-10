import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Heading from '../Heading/Heading';
import Grommet from '../Grommet/Grommet';
import Grid from '../Grid/Grid';
import ThemeContext from '../../contexts/ThemeContext';
import { grommet } from '../../themes';

const H = ({ level, size }) => (
  <Heading level={level} size={size}>
    {`Heading ${level} ${size}`}
  </Heading>
);

const Set = ({ size, theme }) => (
  <div>
    {[1, 2, 3, 4].map(level => <H level={level} size={size} theme={theme} />)}
  </div>
);

class All extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <ThemeContext.Consumer>
          {theme => (
            <Grid columns='large' gap='medium'>
              <Set size='medium' theme={theme} />
              <Set size='small' theme={theme} />
              <Set size='large' theme={theme} />
            </Grid>
          )}
        </ThemeContext.Consumer>
      </Grommet>
    );
  }
}

storiesOf('Heading', module)
  .add('All', () => <All />);
