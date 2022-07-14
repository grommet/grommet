import React, { useState } from 'react';

import { Box, Calendar } from 'grommet';

export const Simple = () => {
  const [date, setDate] = useState('2022-04-14');

  const onSelect = (nextDate) => {
    console.log('onSelect', nextDate);
    setDate(nextDate !== date ? nextDate : undefined);
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box>
      <Box align="center" pad="large">
        <Calendar
          date={date}
          daysOfWeek
          onSelect={onSelect}
          bounds={['2020-09-08', '2025-12-13']}
          // range
        />
      </Box>
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Calendar/Simple',
};
