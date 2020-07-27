import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import { Grommet, Box, Calendar } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleCalendar = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Calendar disabled={['2020-08-07T00:00:00-08:00']} />
      </Box>
    </Grommet>
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/Calendar', module).add('Simple', () => (
    <SimpleCalendar />
  ));
}
