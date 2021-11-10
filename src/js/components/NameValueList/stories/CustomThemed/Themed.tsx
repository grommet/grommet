import React from 'react';
import { Box, Grommet, grommet, NameValueList, NameValuePair } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { ThemeType } from 'grommet/themes';
import { data } from '../data';

// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' if you are not using Typescript.
const customTheme: ThemeType = deepMerge(grommet, {
  nameValueList: {
    pair: {
      column: {
        gap: {
          column: 'large',
          row: 'small',
        },
      },
    },
  },
  nameValuePair: {
    name: {
      color: 'text',
      size: 'xsmall',
      weight: 'bold',
    },
    value: {
      color: 'text',
    },
  },
});

export const Themed = () => (
  <Grommet theme={customTheme}>
    <Box pad="small">
      <NameValueList pairProps={{ direction: 'column' }}>
        {Object.entries(data).map(
          ([name, value]: [string, string | React.ReactElement]) => (
            <NameValuePair key={name} name={name}>
              {value}
            </NameValuePair>
          ),
        )}
      </NameValueList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Custom Themed/TS-Custom',
};
