import React, { useState } from 'react';

import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

export const Multiple = () => {
  const [dates, setDates] = useState([]);

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Calendar
          date={dates}
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
          bounds={['2018-09-08', '2021-12-13']}
        />
      </Box>
    </Grommet>
  );
};

Multiple.storyName = 'Multiple2';

export default {
  title: 'Visualizations/Calendar/Multiple2',
};
