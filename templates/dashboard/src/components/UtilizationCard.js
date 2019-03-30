import React from 'react';
import { Box, Text, Heading, Meter } from 'grommet';
import { StatusBadge } from './StatusBadge';

export const UtilizationCard = ({ data }) => (
  <Box
    direction="row"
    justify="between"
    gap="large"
    pad="medium"
    background="white"
    round
  >
    <Box gap="large">
      <Box gap="xsmall">
        <Heading level="2" margin="none" size="small">
          {data.name}
        </Heading>
        <Text color="gray" size="small">
          {data.value}
        </Text>
      </Box>
      <Box gap="medium">
        <Box direction="row" align="center">
          <StatusBadge
            background={data.used ? 'status-ok' : 'status-unknown'}
          />
          <Text color="dark-1" size="small" margin={{ left: 'xsmall' }}>
            Used ({data.usedValue})
          </Text>
        </Box>
        <Box direction="row" align="center">
          <StatusBadge
            background={data.available ? 'status-ok' : 'status-unknown'}
          />
          <Text color="dark-1" size="small" margin={{ left: 'xsmall' }}>
            Available ({data.availableValue})
          </Text>
        </Box>
      </Box>
    </Box>
    <Meter
      round
      size="small"
      type="circle"
      background="light-2"
      values={[{ value: data.percent }]}
    />
  </Box>
);
