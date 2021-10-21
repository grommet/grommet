import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

export const Align = () => (
  <Grommet theme={grommet}>
    <Box pad="small">
      <>
        <Text weight="bold" size="3xl">
          Align value end
        </Text>
        <NameValueList valueProps={{ align: 'end' }}>
          {Object.entries(data).map(([name, value]) => (
            <NameValuePair key={name} name={name}>
              {value}
            </NameValuePair>
          ))}
        </NameValueList>
      </>
      <>
        <Text weight="bold" size="3xl">
          Align name end
        </Text>
        <NameValueList nameProps={{ align: 'end' }}>
          {Object.entries(data).map(([name, value]) => (
            <NameValuePair key={name} name={name}>
              {value}
            </NameValuePair>
          ))}
        </NameValueList>
      </>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Align',
};
