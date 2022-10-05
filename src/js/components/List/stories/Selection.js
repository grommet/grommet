import React from 'react';

import { Box, List } from 'grommet';

const data = [];

for (let i = 0; i < 40; i += 1) {
  data.push({
    entry: `entry-${i + 1}`,
  });
}

export const Selection = () => {
  const [selected, setSelected] = React.useState();

  return (
    <Box align="center" pad="large" gap="large">
      <List
        aria-label="selection list"
        data={data.slice(0, 10)}
        itemProps={
          selected >= 0 ? { [selected]: { background: 'brand' } } : undefined
        }
        onClickItem={(event) =>
          setSelected(selected === event.index ? undefined : event.index)
        }
      />
    </Box>
  );
};

export default {
  title: 'Visualizations/List/Selection',
};
