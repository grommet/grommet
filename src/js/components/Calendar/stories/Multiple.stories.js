import React, { useState } from 'react';

import { Box, Calendar } from 'grommet';

const end = new Date();
const start = new Date(Date.now() - 1000 * 60 * 60 *24 * 90); // 90 days ago
const bounds = [
  `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`,
  `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
];

export const Multiple = () => {
  const [dates, setDates] = useState([]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" pad="large">
      <Calendar
        dates={dates}
        onSelect={(date) => {
          const nextDates = [...dates];
          const index = nextDates.indexOf(date);
          if (index === -1) {
            nextDates.push(date);
          } else {
            nextDates.splice(index, 1);
          }
          setDates(nextDates);
          console.log('Select iso date:', date, nextDates);
          console.log('Select utc date:', new Date(date));
        }}
        bounds={bounds}
      />
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Calendar/Multiple',
};
