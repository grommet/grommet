import React, { useContext } from 'react';

import { Box, Button, Grommet, Image, Text, ThemeContext} from 'grommet';
import { FormAdd } from 'grommet-icons';

const Item = ({ title, ...rest }) => (
  <Box
    width="531px"
    pad="medium"
    gap="large"
    round="medium"
    background="status-warning"
    flex="grow"
    {...rest}
  >
    <Text
      color="text-strong"
      size="xlarge"
      weight="bold"
      skeleton={{ width: '200px' }}
    >
      {title}
    </Text>
    <Box direction="row" gap="large" justify="between" align="center">
      <Box direction="row" gap="medium">
        <Box width="96px" height="96px" background="orange!" round="small">
          <Image />
        </Box>
        <Box>
          <Text
            size="large"
            color="text-strong"
            weight="bold"
            skeleton={{ width: '200px' }}
          >
            Acme Operations
          </Text>
          <Text size="small" skeleton={{ height: '12px' }}>
            Acme Company Inc
          </Text>
        </Box>
      </Box>
      <Button label="Learn More" />
    </Box>
  </Box>
);

const Item2 = ({ ...rest }) => (
  <Box
    width="531px"
    pad="medium"
    gap="large"
    round="medium"
    flex="grow"
    border
    {...rest}
  >
    <Box direction="row" gap="large" justify="between" align="center">
      <Box direction="row" gap="medium">
        <Box width="96px" height="96px" background="orange!" round="small">
          <Image />
        </Box>
        <Box>
          <Text
            size="large"
            color="text-strong"
            weight="bold"
            skeleton={{ width: '200px' }}
          >
            Compliance
          </Text>
          <Text size="small" skeleton={{ height: '12px' }}>
            Acme Company Inc
          </Text>
        </Box>
      </Box>
      <Button label="Add" reverse icon={<FormAdd />} secondary />
    </Box>
  </Box>
);

const Content = () => (
  <Box fill align="center" pad="large" gap="medium">
    <Item title="Operations assurance and security platform"/>
    <Item skeleton={{ loading: true, animation: 'fadeIn' }} />
    <Item2 />
    <Item2 skeleton={{ loading: true, animation: 'fadeIn' }} />
  </Box>
);

export const Simple = () => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <Grommet theme={theme}>
        <Content />
      </Grommet>
      <Grommet theme={theme} themeMode="dark">
        <Content />
      </Grommet>
    </>
  );
};

export default {
  title: 'Visualizations/Skeleton/Simple',
};
