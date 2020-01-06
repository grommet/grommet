import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { MnetUIBase, Box, Grid } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const GridAreasAlternative = () => {
  return (
    <MnetUIBase full theme={mnet}>
      <Grid
        rows={['xxsmall', 'medium', 'xsmall']}
        columns={['1/4', '3/4']}
        areas={[
          ['header', 'header'],
          ['sidebar', 'main'],
          ['footer', 'footer'],
        ]}
        gap="small"
      >
        <Box background="brand" gridArea="header">
          Header
        </Box>

        <Box background="light-5" gridArea="sidebar">
          Sidebar
        </Box>

        <Box background="light-2" gridArea="main">
          Main
        </Box>

        <Box background="dark-2" gridArea="footer">
          Footer
        </Box>
      </Grid>
    </MnetUIBase>
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/Grid', module).add('Areas prop alternative', () => (
    <GridAreasAlternative />
  ));
}
