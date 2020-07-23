import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import { Grommet, Box, Calendar } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleCalendar = () => {
  const [date, setDate] = useState();

  const onSelect = nextDate => {
    setDate(nextDate !== date ? nextDate : undefined);
  };

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Calendar
          bounds={['2020-08-05', '2020-08-12']}
          disabled={['2020-08-07']}
        />
      </Box>
    </Grommet>
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/Calendar', module).add('Simple', () => (
    <SimpleCalendar />
  ));
}
