import React from 'react';

import { Box, List, Text } from 'grommet';

const locations = [
  'Boise',
  'Fort Collins',
  'Los Gatos',
  'Palo Alto',
  'San Francisco',
];

const data = [];
for (let i = 0; i < 40; i += 1) {
  data.push({
    entry: `entry-${i + 1}`,
    location: locations[i % locations.length],
  });
}

export const RenderedList = () => {
  const PrimaryKeyComponent = React.useCallback(
    (itemEntry) => (
      <Text key={itemEntry} size="large" weight="bold">
        {itemEntry}
      </Text>
    ),
    [],
  );
  const SecondaryKeyComponent = React.useCallback(
    (indexLocation) => (
      <Text key={indexLocation} size="small" color="dark-4">
        {indexLocation}
      </Text>
    ),
    [],
  );
  return (
    <Box align="center" pad="large">
      <List
        data={data.slice(0, 10)}
        primaryKey={(item) => PrimaryKeyComponent(item.entry)}
        secondaryKey={(item) => SecondaryKeyComponent(item.location)}
      />
    </Box>
  );
};

RenderedList.storyName = 'Key render';

export default {
  title: 'Visualizations/List/Key render',
};
