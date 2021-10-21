import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data, metricData } from './data';

export const Layout = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="large">
      <>
        <Text weight="bold" size="2xl">
          layout = grid / pairProps direction = column
        </Text>
        <NameValueList layout="grid" pairProps={{ direction: 'column' }}>
          {Object.entries(data).map(([name, value]) => (
            <NameValuePair key={name} name={name}>
              <Text>{value}</Text>
            </NameValuePair>
          ))}
        </NameValueList>
      </>
      <>
        <Text weight="bold" size="2xl">
          layout = grid / pairProps direction = column-reverse
        </Text>
        <NameValueList
          valueProps={{ width: 'small' }}
          pairProps={{ direction: 'column-reverse' }}
          layout="grid"
        >
          {Object.entries(metricData).map(([name, value]) => (
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
  title: 'Visualizations/NameValueList/Layout',
};
