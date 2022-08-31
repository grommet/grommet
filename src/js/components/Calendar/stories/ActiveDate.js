import React, { useRef, useState } from 'react';

import { Box, Button, Calendar, Text } from 'grommet';

export const ActiveDate = () => {
  const [datesD, setDatesD] = useState();
  const [activeDate, setActiveDate] = useState(undefined);

  const startDateButton = useRef();
  const endDateButton = useRef();

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box gap="small" pad="large">
      <Box direction="row" gap="small">
        <Button
          ref={startDateButton}
          active={activeDate === 'start'}
          label={
            <Box>
              <Text>Start Date</Text>
              <Text>
                {datesD &&
                  datesD[0][0] &&
                  new Date(datesD[0][0]).toDateString()}
              </Text>
            </Box>
          }
          onClick={() => setActiveDate('start')}
        />
        <Button
          ref={endDateButton}
          active={activeDate === 'end'}
          label={
            <Box>
              <Text>End Date</Text>
              <Text>
                {datesD &&
                  datesD[0][1] &&
                  new Date(datesD[0][1]).toDateString()}
              </Text>
            </Box>
          }
          onClick={() => setActiveDate('end')}
        />
      </Box>
      <Calendar
        activeDate={activeDate}
        dates={datesD}
        onSelect={(arg) => {
          setDatesD(arg);
          setActiveDate('end');
        }}
        range="array"
      />
    </Box>
    // </Grommet>
  );
};

ActiveDate.storyName = 'Active date';

export default {
  title: `Visualizations/Calendar/Active date`,
};
