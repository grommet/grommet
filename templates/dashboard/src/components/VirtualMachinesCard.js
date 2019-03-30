import React from 'react';
import { Box, Text, Heading } from 'grommet';
import { StatusBadge } from './StatusBadge';

const statusColors = {
  Off: 'status-critical',
  Suspended: 'status-warning',
  On: 'status-ok',
};

export const VirtualMachinesCard = ({ data, ...rest }) => (
  <Box round pad="medium" direction="column" background="white" {...rest}>
    <Heading level="2" margin="none" size="small">
      {data.name}
    </Heading>
    <Text size="90px" weight="bold">
      {data.count}
    </Text>
    <Box gap="medium" pad={{ vertical: 'small' }}>
      {['On', 'Suspended', 'Off'].map(status => (
        <Box direction="row" align="center" key={status}>
          <StatusBadge size="xlarge" background={statusColors[status]} />
          <Box pad="xsmall">
            <Text size="small" color="dark-1" margin={{ left: 'xsmall' }}>
              {status} ({data[status]})
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);
