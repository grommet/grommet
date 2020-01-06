import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { deepMerge } from 'mnet-ui-base/utils';

import { Box, Calendar, MnetUIBase, mnet } from 'mnet-ui-base';

const customHeading = deepMerge(mnet, {
  calendar: {
    heading: {
      level: '3',
    },
  },
});

const CustomSizeCalendar = () => {
  const [date, setDate] = useState();

  const onSelect = nextDate => {
    setDate(nextDate !== date ? nextDate : undefined);
  };

  return (
    <MnetUIBase theme={customHeading}>
      <Box align="center" pad="large">
        <Calendar
          date={date}
          onSelect={onSelect}
          bounds={['2018-09-08', '2020-12-13']}
        />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Calendar', module).add('Heading Size', () => <CustomSizeCalendar />);
