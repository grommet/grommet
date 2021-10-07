import React from 'react';
import {
  Box,
  Grommet,
  Paragraph,
  NameValueList,
  NameValuePair,
  Text,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

export const CustumValue = () => (
  <Grommet theme={grommet}>
    <Box pad="small">
      <Text weight="bold" size="3xl">
        Aligning text to end
      </Text>
      <NameValueList>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair key={name} name={name}>
            <Text textAlign="end">{value}</Text>
          </NameValuePair>
        ))}
      </NameValueList>
      <Text weight="bold" size="3xl">
        Using Paragraph for Value
      </Text>
      <NameValueList>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair key={name} name={name}>
            <Paragraph margin="none">{value}</Paragraph>
          </NameValuePair>
        ))}
      </NameValueList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Value Options',
};
