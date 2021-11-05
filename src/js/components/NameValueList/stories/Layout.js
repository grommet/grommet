import React from 'react';
import {
  Box,
  Grommet,
  Heading,
  NameValueList,
  NameValuePair,
  Text,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { data, metricData } from './data';

export const Layout = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="large">
      <>
        <Heading level={2} weight="bold" s>
          layout = grid / pairProps direction = column
        </Heading>
        <NameValueList layout="grid" pairProps={{ direction: 'column' }}>
          {Object.entries(data).map(([name, value]) => (
            <NameValuePair key={name} name={name}>
              <Text>{value}</Text>
            </NameValuePair>
          ))}
        </NameValueList>
      </>
      <>
        <Heading level={2} weight="bold">
          layout = grid / pairProps direction = column-reverse
        </Heading>
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
