import React, { useState } from 'react';

import { Box, Calendar } from 'grommet';

export const HeaderLevel = () => {
  const [date, setDate] = useState();

  const onSelect = (nextDate) => {
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
          level={2}
          bounds={['2020-09-08', '2025-12-13']}
        />
      </Box>
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Calendar/Heading Level',
};
