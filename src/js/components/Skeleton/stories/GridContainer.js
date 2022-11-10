import React, { useEffect, useState } from 'react';

import { Box, Button, Card, Grid, Image, Text } from 'grommet';
import { FormAdd } from 'grommet-icons';

const labels = [];
for (let i = 0; i < 10; i += 1) labels.push(`Item ${i}`);

const skeleton = { message: { start: 'Loading', end: 'Content Loaded' } };

const Item = ({ title, ...rest }) => (
  <Card pad="medium" gap="large" round="medium" flex="grow" {...rest}>
    <Box direction="row" gap="large" justify="between" align="center">
      <Box direction="row" gap="medium">
        <Box
          width="xsmall"
          height="xsmall"
          background="brand"
          round="small"
          flex={false}
        >
          <Image />
        </Box>
        <Box>
          <Text
            size="large"
            color="text-strong"
            weight="bold"
            skeleton={{ width: 'xsmall' }}
          >
            {title}
          </Text>
          <Text size="small">Acme Company Inc</Text>
        </Box>
      </Box>
      <Button label="Add" reverse icon={<FormAdd />} secondary />
    </Box>
  </Card>
);

export const GridContainer = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(!loading), 3000);
  }, [loading]);

  return (
    <Box skeleton={loading ? skeleton : undefined}>
      <Grid pad="small" gap="small" columns={['medium', 'medium']}>
        {labels.map((label, index) => (
          <Item
            key={label}
            title={label}
            skeleton={
              loading
                ? {
                    animation: [{ type: 'fadeIn', delay: index * 200 }],
                  }
                : undefined
            }
          />
        ))}
      </Grid>
    </Box>
  );
};

GridContainer.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/Skeleton/GridContainer',
};
