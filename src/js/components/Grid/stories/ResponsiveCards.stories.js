import React, { useContext } from 'react';

import { Box, Card, Grid, ResponsiveContext, Text } from 'grommet';

const cards = Array(20)
  .fill()
  // eslint-disable-next-line react/no-array-index-key
  .map((_, i) => <Text key={i}>{`Card ${i}`}</Text>);

export const Example = () => {
  const size = useContext(ResponsiveContext);
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box pad="large">
      <Grid columns={size !== 'small' ? 'small' : '100%'} gap="small">
        {cards.map((card, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card pad="large" key={index}>
            {card}
          </Card>
        ))}
      </Grid>
    </Box>
    // </Grommet>
  );
};

Example.storyName = 'Responsive cards';

export default {
  title: 'Layout/Grid/Responsive cards',
};
