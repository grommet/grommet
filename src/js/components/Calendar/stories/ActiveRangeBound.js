import React, { useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Calendar, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const ActiveRangeBound = () => {
  const [datesD, setDatesD] = useState();
  const [activeRangeBound, setActiveRangeBound] = useState(undefined);

  const startDateButton = useRef();
  const endDateButton = useRef();

  return (
    <Grommet theme={grommet} full>
      <Box gap="small" pad="large">
        <Box direction="row" gap="small">
          <Button
            ref={startDateButton}
            active={activeRangeBound === 'start'}
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
            onClick={() => setActiveRangeBound('start')}
          />
          <Button
            ref={endDateButton}
            active={activeRangeBound === 'end'}
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
            onClick={() => setActiveRangeBound('end')}
          />
        </Box>
        <Calendar
          activeRangeBound={activeRangeBound}
          dates={datesD}
          onSelect={arg => {
            setDatesD(arg);
            setActiveRangeBound('end');
          }}
          range="bounds"
        />
      </Box>
    </Grommet>
  );
};

storiesOf('Calendar', module).add('ActiveRangeBound', () => (
  <ActiveRangeBound />
));
