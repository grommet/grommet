import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

export const CustomNameRender = () => (
  <Grommet theme={grommet}>
    <Box gap="large" pad="small">
      <Text weight="bold" size="3xl">
        Custom Name
      </Text>
      <NameValueList nameProps={{ align: 'end' }}>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair name={<Text weight="bold">{name}</Text>} key={name}>
            <Text>{value}</Text>
          </NameValuePair>
        ))}
      </NameValueList>
      <Text weight="bold" size="3xl">
        width: xsmall
      </Text>
      <NameValueList>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair
            name={
              <Box width="xsmall">
                <Text weight="bolder">{name}</Text>
              </Box>
            }
            key={name}
          >
            <Text>{value}</Text>
          </NameValuePair>
        ))}
      </NameValueList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Custom Name Render',
};
