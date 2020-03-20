import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { Grommet, Grid, Heading } from 'grommet';
import { grommet } from 'grommet/themes';

const H = ({ level, size }) => (
  <Heading level={level} size={size}>
    {`Heading ${level} ${size}`}
  </Heading>
);

H.propTypes = {
  level: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
};

const Set = ({ size }) => (
  <div>
    {[1, 2, 3, 4, 5, 6].map(level => (
      <H key={level} level={level} size={size} />
    ))}
  </div>
);

Set.propTypes = {
  size: PropTypes.string.isRequired,
};

const All = () => (
  <Grommet theme={grommet}>
    <Grid columns="large" gap="medium">
      <Set size="medium" />
      <Set size="small" />
      <Set size="large" />
      <Set size="xlarge" />
    </Grid>
  </Grommet>
);

storiesOf('Heading', module).add('All', () => <All />);
