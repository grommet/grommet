import React, { useState } from 'react';

import { Box, Calendar, DropButton, Heading, Stack, Text } from 'grommet';
import { Notification } from 'grommet-icons';

export const CustomDayCalendar = () => {
  const calendarContent = [7, 8, 9];
  const [selectedDay, setSelectedDay] = useState();
  const onSelect = (value) => {
    setSelectedDay(value);
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box>
      <Box align="center" pad="large">
        <Heading level={4}>Example without onSelect set</Heading>
        <Calendar date={selectedDay} fill>
          {({ date, day, isSelected }) => {
            const hasContent = calendarContent.includes(day);
            return (
              <Box
                background={isSelected ? 'light-3' : 'white'}
                onClick={() => onSelect(date.toISOString())}
                border
                fill
              >
                <Stack anchor="top-right" fill>
                  <Box pad="small" align="center" justify="center" fill>
                    <Text size="large">{day}</Text>
                  </Box>

                  {hasContent ? (
                    <DropButton
                      icon={<Notification size="small" color="neutral-3" />}
                      dropContent={<Box pad="small">Vacation</Box>}
                      dropAlign={{
                        top: 'bottom',
                      }}
                    />
                  ) : null}
                </Stack>
              </Box>
            );
          }}
        </Calendar>
      </Box>

      <Box align="center" pad="large">
        <Heading level={4}>Example with onSelect set</Heading>

        <Calendar onSelect={onSelect} date={selectedDay} fill>
          {({ day, isSelected }) => (
            <Box background={isSelected ? 'light-3' : 'white'} border fill>
              <Box pad="small" align="center" justify="center" fill>
                <Text size="large">{day}</Text>
              </Box>
            </Box>
          )}
        </Calendar>
      </Box>
    </Box>
    // </Grommet>
  );
};

CustomDayCalendar.storyName = 'Custom day';

export default {
  title: `Visualizations/Calendar/Custom day`,
};
