import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Calendar } from 'mnet-ui-base';

const SimpleCalendar = () => {
  const [date, setDate] = useState();

  const onSelect = nextDate => {
    setDate(nextDate !== date ? nextDate : undefined);
  };

  return (
    <>
      <Box align="center" pad="large">
        <Calendar
          date={date}
          onSelect={onSelect}
          size="small"
          bounds={['2018-09-08', '2020-12-13']}
        />
      </Box>
      <Box align="center" pad="large">
        <Calendar
          date={date}
          daysOfWeek
          onSelect={onSelect}
          size="small"
          bounds={['2018-09-08', '2020-12-13']}
        />
      </Box>
    </>
  );
};

storiesOf('Calendar', module).add('Simple', () => <SimpleCalendar />);
