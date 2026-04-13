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


const end = new Date();
const start = new Date(Date.now() - 1000 * 60 * 60 *24 * 90); // 90 days ago
const bounds = [
  `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`,
  `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
];

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
          bounds={bounds}
        />
      </Box>
    </Grommet>
  );
};

CustomSizeCalendar.storyName = 'Heading size';

export default {
  title: 'Visualizations/Calendar/Custom Themed/Heading size',
};
