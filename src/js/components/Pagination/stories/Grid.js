import React, { useState } from 'react';

import { Box, Card, Grid, Pagination, Text } from 'grommet';

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

export const PaginatedGrid = () => {
  const [currentData, setCurrentData] = useState(data.slice(0, 10));
  const [indices, setIndices] = useState([0, 10]);

  const handleChange = ({ startIndex, endIndex }) => {
    const nextData = data.slice(startIndex, endIndex);
    setCurrentData(nextData);
    setIndices([startIndex, Math.min(endIndex, data.length)]);
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box pad="large" gap="medium">
      <Box height={{ min: 'medium' }}>
        <Grid columns="small" rows="small" gap="medium" justify="center">
          {currentData.map((datum) => (
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
    // </Grommet>
  );
};

PaginatedGrid.storyName = 'Grid';

PaginatedGrid.args = {
  full: true,
};

export default {
  title: 'Controls/Pagination/Grid',
};
