import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { StatusCriticalSmall, StatusGoodSmall } from 'grommet-icons';
import { statusData } from './data';

export const CustomValue = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="medium">
      <>
        <Text weight="bold" size="3xl">
          Custom Value
        </Text>
        <NameValueList>
          {Object.entries(statusData).map(([name, value]) => {
            let icon;
            if (
              value ===
              'Management for campus, branch, remote, and data center network'
            )
              icon = <StatusGoodSmall color="green" size="small" />;
            else if (value === 'Critical')
              icon = <StatusCriticalSmall color="red" size="small" />;
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
      </>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Custom Value',
};
