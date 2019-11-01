import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Calendar, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

import { FormPreviousLink, FormNextLink } from 'grommet-icons';

const CustomHeaderCalendar = () => {
  const [date, setDate] = useState();

  const onSelect = nextDate => {
    setDate(nextDate !== date ? nextDate : undefined);
  };

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Calendar
          date={date}
          onSelect={onSelect}
          size="small"
          bounds={['2018-09-08', '2018-12-13']}
          header={({
            date: currentDate,
            locale,
            onPreviousMonth,
            onNextMonth,
            previousInBound,
            nextInBound,
          }) => (
            <Box direction="row" align="center" justify="between">
              <Button disabled={!previousInBound} onClick={onPreviousMonth}>
                <Box>
                  <FormPreviousLink />
                </Box>
              </Button>
              <Text size="small">
                <strong>
                  {currentDate.toLocaleDateString(locale, {
                    month: 'long',
                    year: 'numeric',
                  })}
                </strong>
              </Text>
              <Button disabled={!nextInBound} onClick={onNextMonth}>
                <Box>
                  <FormNextLink />
                </Box>
              </Button>
            </Box>
          )}
        />
      </Box>
    </Grommet>
  );
};

storiesOf('Calendar', module).add('Custom Header', () => (
  <CustomHeaderCalendar />
));
