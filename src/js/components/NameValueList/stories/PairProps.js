import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

export const PairProps = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="large">
      <>
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
      </>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Pair Props',
};
