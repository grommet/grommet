import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { MnetUIBase, Box, Grid } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const NColumnGrid = () => (
  <MnetUIBase theme={mnet} full>
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
  </MnetUIBase>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Grid', module).add('N-column layout', () => (
    <NColumnGrid />
  ));
}
