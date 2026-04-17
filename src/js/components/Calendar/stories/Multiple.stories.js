import React, { useState } from 'react';

import { Box, Calendar } from 'grommet';

const initialMonth = '2026-03-12T21:09:16.501Z';

export const Multiple = () => {
  const [dates, setDates] = useState();
  const [reference, setReference] = useState(initialMonth);
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" pad="large">
      <Calendar
        dates={dates}
        onSelect={(date) => {
          const nextDates = dates ? [...dates] : [];
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
        reference={reference}
        onReference={setReference}
      />
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Calendar/Multiple',
};
