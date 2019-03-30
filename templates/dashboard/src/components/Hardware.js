import React from 'react';
import { Anchor, Box, Text, Heading } from 'grommet';
import { Update } from 'grommet-icons';

export const Hardware = ({ data, ...rest }) => (
  <Box direction="column" gap="large">
    <Box round pad="medium" direction="column" background="white" {...rest}>
      <Box gap="small">
        <Heading level="2" margin="none" size="small">
          {data.Hypervisor.name}
        </Heading>
        <Box direction="row" justify="between">
          <Text color="gray" size="small">
            {data.Hypervisor.hardware}
          </Text>
          <Box direction="row" align="center">
            <Box pad={{ horizontal: 'small' }}>
              <Anchor href="" label="Update" />
            </Box>
            <Update size="small" color="brand" />
          </Box>
        </Box>
        <Text color="gray" />
      </Box>
    </Box>
    <Box
      round
      pad="medium"
      direction="column"
      background="white"
      justify="between"
      gap="small"
      {...rest}
    >
      <Box>
        <Box gap="small">
          <Heading level="2" margin="none" size="small">
            {data.Hardware.name}
          </Heading>
          <Text color="gray" size="small">
            {data.Hardware.hardware}
          </Text>
        </Box>
      </Box>
      <Box direction="row" wrap>
        <Box
          flex={false}
          round="small"
          margin="xsmall"
          pad={{ vertical: 'small', horizontal: 'medium' }}
          border={{ side: 'all', color: 'accent-4', size: 'small' }}
        >
          4 Hosts
        </Box>
        <Box
          flex={false}
          round="small"
          margin="xsmall"
          pad={{ vertical: 'small', horizontal: 'medium' }}
          border={{ side: 'all', color: 'accent-2', size: 'small' }}
        >
          2 Nodes
        </Box>
      </Box>
    </Box>
  </Box>
);
