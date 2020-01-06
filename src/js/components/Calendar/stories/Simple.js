import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Calendar, MnetUIBase } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const SimpleCalendar = () => {
  const [date, setDate] = useState();

  const onSelect = nextDate => {
    setDate(nextDate !== date ? nextDate : undefined);
  };

  return (
    <MnetUIBase theme={mnet}>
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
    </MnetUIBase>
  );
};

storiesOf('Calendar', module).add('Simple', () => <SimpleCalendar />);
