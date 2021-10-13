import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

export const Align = () => (
  <Grommet theme={grommet}>
    <Box pad="small">
      <Text weight="bold" size="3xl">
        Aligning value to end
      </Text>
      <NameValueList>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair key={name} name={name}>
            <Text textAlign="end">{value}</Text>
          </NameValuePair>
        ))}
      </NameValueList>
      <Text weight="bold" size="3xl">
        Aligning name to end & value to start
      </Text>
      <NameValueList
        valueProps={{ align: 'start' }}
        nameProps={{ align: 'end' }}
      >
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair key={name} name={name}>
            <Text>{value}</Text>
          </NameValuePair>
        ))}
      </NameValueList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Align',
};
