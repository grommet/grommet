import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { data } from './data';

export const CustomName = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="small" gap="medium">
    <Text weight="bold" size="3xl">
      Custom Name
    </Text>
    <NameValueList>
      {Object.entries(data).map(([name, value]) => (
        <NameValuePair
          name={
            <Text size="small" weight="bold">
              {name}
            </Text>
          }
          key={name}
        >
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Custom Name',
};
