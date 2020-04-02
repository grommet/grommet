import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
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
            console.log('!!! select', date, nextDates);
          }}
          bounds={['2018-09-08', '2020-12-13']}
        />
      </Box>
    </Grommet>
  );
};

storiesOf('Calendar', module).add('Multiple', () => <Example />);
