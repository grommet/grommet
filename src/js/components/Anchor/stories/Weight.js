import React from 'react';

import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const WeightAnchor = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large" gap="xsmall">
      <Anchor href="#" label="Anchor default weight" />
      <Anchor href="#" label="Anchor weight Normal" weight="normal" />
      <Anchor href="#" label="Anchor weight Bold" weight="bold" />
      <Anchor href="#" label="Anchor weight 200" weight={200} />
      <Anchor href="#" label="Anchor weight 400" weight={400} />
      <Anchor href="#" label="Anchor weight 600" weight={600} />
      <Anchor href="#" label="Anchor weight Lighter" weight="lighter" />
      <Anchor href="#" label="Anchor weight Bolder" weight="bolder" />
      <Anchor href="#" label="Anchor weight Inherit" weight="inherit" />
      <Anchor href="#" label="Anchor weight Initial" weight="initial" />
      <Anchor href="#" label="Anchor weight Revert" weight="revert" />
      <Anchor href="#" label="Anchor weight Unset" weight="unset" />
    </Box>
  </Grommet>
);

export const Weight = () => <WeightAnchor />;

export default {
  title: 'Controls/Anchor/Weight',
};
