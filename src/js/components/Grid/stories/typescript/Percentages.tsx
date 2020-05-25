import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, Grid } from 'mnet-ui-base';

const Percentages = () => (
  <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
    <Grid
      fill
      areas={[
        { name: 'nav', start: [0, 0], end: [0, 0] },
        { name: 'main', start: [1, 0], end: [1, 0] },
      ]}
      columns={['small', 'flex']}
      rows={['flex']}
      gap="small"
    >
      <Box gridArea="nav" background="brand" />
      <Box gridArea="main" background="brand" />
    </Grid>
  </div>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Grid', module).add('Percentages', () => (
    <Percentages />
  ));
}
