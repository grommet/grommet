import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

export const Width = () => (
  <Grommet theme={grommet}>
    <Box gap="large" pad="small">
      <>
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
      </>
      <>
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
      </>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Width',
};
