import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair } from 'grommet';
import { grommet } from 'grommet/themes';
import { data, metricData } from './data';

export const Direction = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="large">
      <NameValueList layout="grid" pairProps={{ direction: 'column' }}>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair key={name} name={name} value={value} />
        ))}
      </NameValueList>
      <NameValueList pairProps={{ direction: 'column' }}>
        {Object.entries(metricData).map(([name, value]) => (
          <NameValuePair key={name} name={name} value={value} />
        ))}
      </NameValueList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Direction',
};
