import React from 'react';

import { Box, Button, Card, Grommet, Text } from 'grommet';
import { useThemeValue } from '../../../utils/useThemeValue';

const Item = ({ title, ...rest }) => (
  <Card
    width="531px"
    pad="medium"
    gap="large"
    round="medium"
    flex="grow"
    {...rest}
  >
    <Text
      color="text-strong"
      size="xlarge"
      weight="bold"
      skeleton={{ width: 'medium' }}
    >
      {title}
    </Text>
    <Box direction="row" gap="large" justify="between" align="center">
      <Box direction="row" gap="medium">
        <Box
          width="xsmall"
          height="xsmall"
          background="orange!"
          round="small"
        />
        <Box>
          <Text
            size="large"
            color="text-strong"
            weight="bold"
            skeleton={{ width: 'small' }}
          >
            Acme Operations
          </Text>
          <Text size="small">Acme Company Inc</Text>
        </Box>
      </Box>
      <Button label="Learn More" />
    </Box>
  </Card>
);

const skeleton = { animation: 'fadeIn' };

const Content = () => (
  <Box fill align="center" pad="large" gap="medium">
    <Item title="Operations assurance and security platform" />
    <Item skeleton={skeleton} />
  </Box>
);

export const Individual = () => {
  const { theme } = useThemeValue();
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
  title: 'Visualizations/Skeleton/Individual',
};
