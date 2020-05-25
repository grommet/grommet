import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, Grid } from 'mnet-ui-base';
const NColumnGrid = () => (
  <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
    <Grid
      columns={{
        count: 6,
        size: 'auto',
      }}
      gap="small"
    >
      <Box background="brand">Item 1</Box>
      <Box background="brand">Item 2</Box>
      <Box background="brand">Item 3</Box>
      <Box background="brand">Item 4</Box>
      <Box background="brand">Item 5</Box>
      <Box background="brand">Item 6</Box>
    </Grid>
  </div>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Grid', module).add('N-column layout', () => (
    <NColumnGrid />
  ));
}
