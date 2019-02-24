import * as React from 'react';
import Grid from '../Grid';
import Box from '../../Box/Box/Box';

export default (
  <Grid
    uxpId="grid0"
    rows={['xxsmall', 'xsmall']}
    columns={['xsmall', 'small']}
    gap="small"
    areas={[
      { name: 'header', start: [0, 0], end: [1, 0] },
      { name: 'nav', start: [0, 1], end: [0, 1] },
      { name: 'main', start: [1, 1], end: [1, 1] },
    ]}
  >
    <Box gridArea="header" background="brand" uxpId="gridElement0" />
    <Box gridArea="nav" background="light-5" uxpId="gridElement1" />
    <Box gridArea="main" background="light-2" uxpId="gridElement2" />
  </Grid>
);
