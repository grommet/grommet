import React from 'react';
import { Box, Grommet, Property, PropertyList, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { StatusCriticalSmall, StatusGoodSmall } from 'grommet-icons';
import { data, statusData } from './data';

export const Simple = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="medium">
      <Text weight="bold" size="3xl">
        Default
      </Text>
      <PropertyList>
        {Object.entries(data).map(([name, value]) => (
          <Property key={name} name={name} value={value} />
        ))}
      </PropertyList>
      <Text weight="bold" size="3xl">
        Custom Child Value
      </Text>
      <PropertyList>
        {Object.entries(statusData).map(([name, value]) => {
          let icon;
          if (value === 'Ok')
            icon = <StatusGoodSmall color="green" size="small" />;
          else if (value === 'Critical')
            icon = <StatusCriticalSmall color="red" size="small" />;
          return (
            <Property key={name} name={name}>
              <Box align="center" direction="row" gap="xsmall">
                {icon}
                <Text color="text-strong">{value}</Text>
              </Box>
            </Property>
          );
        })}
      </PropertyList>
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/PropertyList/Simple',
};
