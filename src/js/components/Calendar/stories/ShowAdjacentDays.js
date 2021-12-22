import React, { useState } from 'react';

import { Calendar, Grid, Text } from 'grommet';
import { Box } from '../../Box';

const Container = ({ ...rest }) => (
  <Box align="center" border gap="small" pad="medium" {...rest} />
);

export const ShowAdjacent = () => {
  const [date, setDate] = useState(new Date(2020, 6, 15).toDateString());

  const onSelect = (nextDate) => {
    setDate(nextDate !== date ? nextDate : undefined);
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Grid columns={{ count: 'fit', size: ['small', 'auto'] }} gap="medium">
      <Container>
        <Text size="small">showAdjacentDays = false</Text>
        <Calendar
          date={date}
          onSelect={onSelect}
          size="small"
          bounds={['2018-09-08', '2020-12-13']}
          showAdjacentDays={false}
        />
      </Container>
      <Container>
        <Text size="small">showAdjacentDays = true</Text>
        <Calendar
          date={date}
          onSelect={onSelect}
          size="small"
          bounds={['2018-09-08', '2020-12-13']}
        />
      </Container>
      <Container>
        <Text size="small">showAdjacentDays = &quot;trim&quot;</Text>
        <Calendar
          date={date}
          onSelect={onSelect}
          size="small"
          bounds={['2018-09-08', '2020-12-13']}
          showAdjacentDays="trim"
        />
      </Container>
    </Grid>
    // </Grommet>
  );
};

ShowAdjacent.storyName = 'Show adjacent days';

export default {
  title: `Visualizations/Calendar/Show adjacent days`,
};
