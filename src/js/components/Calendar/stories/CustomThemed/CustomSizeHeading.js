import React, { useState } from 'react';
import { deepMerge } from 'grommet/utils';

import { Box, Calendar, Grommet, grommet } from 'grommet';

const customHeading = deepMerge(grommet, {
  calendar: {
    heading: {
      level: '3',
    },
  },
});

export const CustomSizeCalendar = () => {
  const [date, setDate] = useState();

  const onSelect = (nextDate) => {
    setDate(nextDate !== date ? nextDate : undefined);
  };

  return (
    <Grommet theme={customHeading}>
      <Box align="center" pad="large">
        <Calendar
          date={date}
          onSelect={onSelect}
          bounds={['2020-09-08', '2025-12-13']}
        />
      </Box>
    </Grommet>
  );
};

CustomSizeCalendar.storyName = 'Heading size';

export default {
  title: `Visualizations/Calendar/Custom Themed/Heading size`,
};
