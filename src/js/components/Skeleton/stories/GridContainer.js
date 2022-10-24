import React, { useEffect, useState } from 'react';

import { Box, Button, Card, Grid, Image, Text} from 'grommet';
import { FormAdd } from 'grommet-icons';

const labels = [];
for (let i = 0; i < 10; i += 1) labels.push(`Item ${i}`);

const Item = ({ title, ...rest }) => (
  <Card
    width="531px"
    pad="medium"
    gap="large"
    round="medium"
    flex="grow"
    {...rest}
  >
    <Box direction="row" gap="large" justify="between" align="center">
      <Box direction="row" gap="medium">
        <Box width="96px" height="96px" background="brand" round="small">
          <Image />
        </Box>
        <Box>
          <Text
            size="large"
            color="text-strong"
            weight="bold"
            skeleton={{ width: '200px' }}
          >
            {title}
          </Text>
          <Text size="small" >
            Acme Company Inc
          </Text>
        </Box>
      </Box>
      <Button label="Add" reverse icon={<FormAdd />} secondary />
    </Box>
  </Card>
);

export const GridContainer = () => {
  const [skeleton, setSkeleton] = useState(true);
  useEffect(() => {
    setTimeout(() => setSkeleton(!skeleton), 3000);
  }, [skeleton]);

  return (
    <Box skeleton={skeleton}>
      <Button label="Reload" onClick={() => setSkeleton(true)} />
      <Grid pad="small" gap="small" columns={['medium', 'medium']}>
        {labels.map((label, index) => (
          <Item
            key={label}
            title={label}
            skeleton={
              skeleton
                ? {
                    animation: [
                      { type: 'fadeIn', delay: index * 200},
                    ],
                  }
                : undefined
            }
          />
        ))}
      </Grid>
    </Box>
  );
};

export default {
  title: 'Visualizations/Skeleton/GridContainer',
};
