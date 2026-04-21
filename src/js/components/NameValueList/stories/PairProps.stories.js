import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { data } from './data';

export const PairProps = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="small" gap="medium">
    <Text weight="bold" size="2xl">
      layout = column (default) / pairProps direction = column
    </Text>
    <NameValueList pairProps={{ direction: 'column' }}>
      {Object.entries(data).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          <Text>{value}</Text>
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Pair Props',
};
