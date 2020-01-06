import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Grid, Heading } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';
import { deepMerge } from 'mnet-ui-base/utils';

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
  <MnetUIBase theme={mnet}>
    <Grid columns="large" gap="medium">
      <Set size="medium" />
      <Set size="small" />
      <Set size="large" />
      <Set size="xlarge" />
    </Grid>
  </MnetUIBase>
);

const Color = () => (
  <MnetUIBase theme={mnet}>
    <Heading color="accent-1">Colored Heading</Heading>
  </MnetUIBase>
);

const customlevel = deepMerge(mnet, {
  heading: {
    level: {
      5: {
        small: {
          size: '12px',
          height: '16px',
        },
        medium: {
          size: '14px',
          height: '18px',
        },
        large: {
          size: '16px',
          height: '20px',
        },
      },
    },
    extend: props => `color: ${props.theme.global.colors.brand}`,
  },
});
const CustomHeading = () => (
  <MnetUIBase theme={customlevel}>
    <Heading level={5}>Heading level 5</Heading>
  </MnetUIBase>
);

storiesOf('Heading', module)
  .add('All', () => <All />)
  .add('Color', () => <Color />)
  .add('Custom', () => <CustomHeading />);
storiesOf('Heading', module).add('All', () => <All />);
