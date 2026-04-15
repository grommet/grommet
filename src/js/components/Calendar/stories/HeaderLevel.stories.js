import React, { useState } from 'react';

import { Box, Calendar } from 'grommet';

const reference = '2026-04-12T21:09:16.501Z';
const end = new Date(reference);
const start = new Date(end.getTime() - 1000 * 60 * 60 *24 * 90); // 90 days ago
const bounds = [
  `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`,
  `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
];

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
          bounds={bounds}
          reference={reference}
        />
      </Box>
    </Box>
    // </Grommet>
  );
};

HeaderLevel.storyName = 'Heading level';

export default {
  title: 'Visualizations/Calendar/Heading level',
};
