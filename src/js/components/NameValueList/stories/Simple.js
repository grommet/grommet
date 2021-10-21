import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { StatusCriticalSmall, StatusGoodSmall } from 'grommet-icons';
import { data, statusData } from './data';

export const Simple = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="medium">
      <Text weight="bold" size="3xl">
        Default
      </Text>
      <NameValueList>
        {Object.entries(data).map(([name, value]) => (
          <NameValuePair key={name} name={name}>
            {value}
          </NameValuePair>
        ))}
      </NameValueList>
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
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Simple',
};
