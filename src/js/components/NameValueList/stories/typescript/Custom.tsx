import React from 'react';
import {
  Box,
  Grommet,
  grommet,
  NameValueList,
  NameValuePair,
  Text,
} from 'grommet';
import { deepMerge } from 'grommet/utils';
import { data } from '../data';

const customTheme = deepMerge(grommet, {
  nameValuePair: {
    name: {
      color: 'text',
      size: 'xsmall',
      weight: 500,
    },
    value: {
      color: 'text',
      weight: 700,
    },
  },
});

export const Custom = () => (
  <Grommet theme={customTheme}>
    <Box pad="small">
      <NameValueList pairProps={{ direction: 'column' }}>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair key={name} name={name}>
            <Text color="text" weight="bold">
              {value}
            </Text>
          </NameValuePair>
        ))}
      </NameValueList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Custom',
};
