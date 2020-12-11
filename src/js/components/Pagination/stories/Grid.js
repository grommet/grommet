import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Card, Grid, Grommet } from 'grommet';
// import { grommet } from 'grommet/themes';
import { hpe } from 'grommet-theme-hpe';
import { Pagination } from '..';

const data = [];

for (let i = 0; i < 95; i += 1) {
  data.push({
    entry: `entry-${i + 1}`,
  });
}

const CardResult = ({ item }) => (
  <Card fill pad="medium">
    {item.entry}
  </Card>
);

const PaginatedCards = () => {
  const [currentData, setCurrentData] = useState(data.slice(0, 10));

  const handleChange = ({ startIndex, endIndex }) => {
    const nextData = data.slice(startIndex, endIndex);
    setCurrentData(nextData);
  };
  return (
    <Grommet theme={hpe} full>
      <Box pad="large" gap="medium" fill>
        <Grid columns="small" rows="small" gap="medium" justify="center">
          {currentData.map(datum => (
            <CardResult item={datum} key={datum.entry} />
          ))}
        </Grid>
        <Pagination
          alignSelf="end"
          numItems={data.length}
          onChange={handleChange}
        />
      </Box>
    </Grommet>
  );
};

storiesOf('Pagination', module).add('Grid', () => <PaginatedCards />);
