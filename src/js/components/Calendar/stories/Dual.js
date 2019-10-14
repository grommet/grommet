import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Calendar, Grommet, Heading } from 'grommet';
import { grommet } from 'grommet/themes';

import { Blank, Previous, Next } from 'grommet-icons';

const now = new Date();
const next = new Date(now);
next.setMonth(now.getMonth() + 1, 1);

const DualCalendar = () => {
  const [date, setDate] = useState();
  const [dates, setDates] = useState();
  const [reference1, setReference1] = useState(now);
  const [reference2, setReference2] = useState(next);

  const onSelect = arg => {
    if (Array.isArray(arg)) {
      setDate(undefined);
      setDates(arg);
    } else {
      setDate(arg);
      setDates(undefined);
    }
  };

  return (
    <Grommet theme={grommet}>
      <Box justify="center" pad="large" direction="row" gap="small">
        <Calendar
          animate={false}
          showAdjacentDays={false}
          range
          date={date}
          dates={dates}
          onSelect={onSelect}
          reference={reference1.toISOString()}
          onReference={reference => {
            const refDate = new Date(reference);
            const nextDate = new Date(refDate);
            nextDate.setMonth(refDate.getMonth() + 1, 1);
            setReference1(refDate);
            setReference2(nextDate);
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
          reference={reference2.toISOString()}
          onReference={reference => {
            const refDate = new Date(reference);
            const priorDate = new Date(refDate);
            priorDate.setMonth(refDate.getMonth() - 1, 1);
            setReference1(priorDate);
            setReference2(refDate);
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
    </Grommet>
  );
};

storiesOf('Calendar', module).add('Dual', () => <DualCalendar />);
