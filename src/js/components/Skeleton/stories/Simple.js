import React from 'react';

import { Box, Button, Grommet, Image, Text } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { FormAdd } from 'grommet-icons';

const Item = ({title, ...rest }) => (
  <Box
    width="531px"
    pad="medium"
    gap="large"
    round="medium"
    background="status-warning"
    flex="grow"
    {...rest}
  >
    <Text color="text-strong" size="xlarge" weight="bold">
      {title}
    </Text>
    <Box direction="row" gap="large" justify="between" align="center">
      <Box direction="row" gap="medium">
        <Box width="96px" height="96px" background="orange!" round="small">
          <Image />
        </Box>
        <Box>
          <Text size="large" color="text-strong" weight="bold">
            Aruba Network Operations
          </Text>
          <Text size="small">Aruba Networks</Text>
        </Box>
      </Box>
      <Button label="Learn More"/>
    </Box>
  </Box>
);

const Item2 = ({...rest }) => (
  <Box
    width="531px"
    pad="medium"
    gap="large"
    round="medium"
    flex="grow"
    {...rest}
  >
    <Box direction="row" gap="large" justify="between" align="center">
      <Box direction="row" gap="medium">
        <Box width="96px" height="96px" background="orange!" round="small">
          <Image />
        </Box>
        <Box>
          <Text size="large" color="text-strong" weight="bold">
            Compliance
          </Text>
          <Text size="small">Hewlett Packard Enterprise</Text>
        </Box>
      </Box>
      <Button label="Add" reverse icon={<FormAdd />} secondary />
    </Box>
  </Box>
);

const Content = () => (
  <Box fill align="center" pad="large" gap="medium">
    <Item title="Unified network operations, assurance and security platform"/>
    <Item skeleton={{ loading: true, animation: 'fadeIn' }} />
    <Item2 />
    <Item2 skeleton={{ loading: true, animation: 'fadeIn' }} />
  </Box>
);

export const Simple = () => (
  <>
    <Grommet theme={hpe}>
      <Content />
    </Grommet>
    <Grommet theme={hpe} themeMode="dark">
      <Content />
    </Grommet>
  </>
);

export default {
  title: 'Visualizations/Skeleton/Simple',
};
