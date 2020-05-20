import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';

import {
  grommet,
  Box,
  Card,
  Grid,
  Grommet,
  ResponsiveContext,
  Text,
} from 'grommet';

const cards = Array(20)
  .fill()
  .map((_, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <Text key={i}>{`Card (${i})`}</Text>
  ));

const Example = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Grommet theme={grommet}>
      <Box pad="large">
        <Grid
          columns={size !== 'small' ? 'small' : '100%'}
          rows={[['auto', 'full']]}
          gap="medium"
          justify="center"
          fill
        >
          {cards.map(card => (
            <Card pad="large">{card} </Card>
          ))}
        </Grid>
      </Box>
    </Grommet>
  );
};

storiesOf('Card', module).add('Responsive', () => <Example />);
