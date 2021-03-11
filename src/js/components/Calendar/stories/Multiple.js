import React, { useState } from 'react';

import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

export const Multiple = () => {
  const [dates, setDates] = useState([]);

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Calendar
          dates={dates}
          onSelect={date => {
            const nextDates = [...dates];
            const index = nextDates.indexOf(date);
            if (index === -1) {
              nextDates.push(date);
            } else {
              nextDates.splice(index, 1);
            }
            setDates(nextDates);
            console.log('Select', date, nextDates);
          }}
          bounds={['2020-09-08', '2025-12-13']}
        />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Calendar/Multiple',
};
