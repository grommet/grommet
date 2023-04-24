import React, { useState } from 'react';

import { Box, Button, Calendar, Heading } from 'grommet';

import { Blank, Previous, Next } from 'grommet-icons';

export const Dual = () => {
  const [date, setDate] = useState();
  const [dates, setDates] = useState();
  const [reference1, setReference1] = useState('2020-08-07T15:13:47.290Z');
  const [reference2, setReference2] = useState('2020-09-01T15:15:34.916Z');
  const onSelect = (arg) => {
    if (Array.isArray(arg)) {
      setDate(undefined);
      setDates(arg);
    } else {
      setDate(arg);
      setDates(undefined);
    }
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box justify="center" pad="large" direction="row" gap="small">
      <Calendar
        animate={false}
        showAdjacentDays={false}
        range
        date={date}
        dates={dates}
        onSelect={onSelect}
        reference={reference1}
        onReference={(reference) => {
          const refDate = new Date(reference);
          const nextDate = new Date(refDate);
          nextDate.setMonth(refDate.getMonth() + 1, 1);
          setReference1(refDate.toISOString());
          setReference2(nextDate.toISOString());
        }}
        header={({
          date: currentDate,
          locale,
          onPreviousMonth,
          previousInBound,
        }) => (
          <Box direction="row" align="center" justify="between">
            <Button
              disabled={!previousInBound}
              icon={<Previous />}
              onClick={onPreviousMonth}
            />
            <Heading level={3} margin="none">
              {currentDate.toLocaleDateString(locale, {
                month: 'long',
                year: 'numeric',
              })}
            </Heading>
            <Blank />
          </Box>
        )}
      />
      <Calendar
        animate={false}
        showAdjacentDays={false}
        date={date}
        dates={dates}
        range
        onSelect={onSelect}
        reference={reference2}
        onReference={(reference) => {
          const refDate = new Date(reference);
          const priorDate = new Date(refDate);
          priorDate.setMonth(refDate.getMonth() - 1, 1);
          setReference1(priorDate.toISOString());
          setReference2(refDate.toISOString());
        }}
        header={({ date: currentDate, locale, onNextMonth, nextInBound }) => (
          <Box direction="row" align="center" justify="between">
            <Blank />
            <Heading level={3} margin="none">
              {currentDate.toLocaleDateString(locale, {
                month: 'long',
                year: 'numeric',
              })}
            </Heading>
            <Button
              disabled={!nextInBound}
              icon={<Next />}
              onClick={onNextMonth}
            />
          </Box>
        )}
      />
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Calendar/Dual',
};
