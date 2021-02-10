import React, { useState } from 'react';

import { Box, Card, Grid, Grommet, Pagination, Text } from 'grommet';
import { grommet } from 'grommet/themes';

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

const PaginatedGrid = () => {
  const [currentData, setCurrentData] = useState(data.slice(0, 10));
  const [indices, setIndices] = useState([0, 10]);

  const handleChange = ({ startIndex, endIndex }) => {
    const nextData = data.slice(startIndex, endIndex);
    setCurrentData(nextData);
    setIndices([startIndex, Math.min(endIndex, data.length)]);
  };

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" gap="medium">
        <Box height={{ min: 'medium' }}>
          <Grid columns="small" rows="small" gap="medium" justify="center">
            {currentData.map(datum => (
              <CardResult item={datum} key={datum.entry} />
            ))}
          </Grid>
        </Box>
        <Box align="center" direction="row" justify="between">
          <Text>
            Showing {indices[0] + 1} - {indices[1]} of {data.length}
          </Text>
          <Pagination numberItems={data.length} onChange={handleChange} />
        </Box>
      </Box>
    </Grommet>
  );
};

export { PaginatedGrid as Grid };

export default {
  title: 'Controls/Pagination/Grid',
};
