import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import {
  Language,
  StatusCriticalSmall,
  StatusGoodSmall,
  System,
} from 'grommet-icons';
import { languageData, statusData } from './data';

export const CustomValue = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box>
    <Box pad="small" gap="medium">
      <Text weight="bold" size="3xl">
        Custom Value
      </Text>
      <NameValueList>
        {Object.entries(statusData).map(([name, value]) => {
          let icon;
          if (value === 'Ok')
            icon = <StatusGoodSmall color="green" size="small" />;
          else if (value === 'Critical')
            icon = <StatusCriticalSmall color="red" size="small" />;
          return (
            <NameValuePair key={name} name={name}>
              <Box align="center" direction="row" gap="xsmall">
                {icon}
                <Text color="text-strong">{value}</Text>
              </Box>
            </NameValuePair>
          );
        })}
      </NameValueList>
    </Box>
    <Box pad="small" gap="medium">
      <Text weight="bold" size="3xl">
        Custom Multi-Line Value
      </Text>
      <NameValueList>
        {Object.entries(languageData).map(([name, value]) => {
          let icon;
          if (name === 'Languages') icon = <Language size="small" />;
          else if (name === 'Operating System') icon = <System size="small" />;
          return (
            <NameValuePair key={name} name={name}>
              <Box align="start" direction="row" gap="xsmall">
                {/* margin-top aligns icon with font line height */}
                <Box flex={false} margin={{ top: 'xsmall' }}>
                  {icon}
                </Box>
                <Text color="text-strong">{value}</Text>
              </Box>
            </NameValuePair>
          );
        })}
      </NameValueList>
    </Box>
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Custom Value',
};
