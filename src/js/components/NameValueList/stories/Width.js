import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { data } from './data';

export const Width = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="small" gap="medium">
    <Text weight="bold" size="3xl">
      Name width xsmall
    </Text>
    <NameValueList nameProps={{ width: 'xsmall' }}>
      {Object.entries(data).map(([name, value]) => (
        <NameValuePair name={name} key={name}>
          <Text>{value}</Text>
        </NameValuePair>
      ))}
    </NameValueList>
    <Text weight="bold" size="3xl">
      Value width large
    </Text>
    <NameValueList valueProps={{ width: 'large' }}>
      {Object.entries(data).map(([name, value]) => (
        <NameValuePair name={name} key={name}>
          <Text>{value}</Text>
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Width',
};
