import React from 'react';

import { Box, Button, Menu } from 'grommet';
import { Share } from 'grommet-icons/icons/Share';

import { ButtonBar } from '../ButtonBar';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large" gap="medium">
    <ButtonBar>
      <Menu label="actions" items={[{ label: 'Edit' }, { label: 'Export' }]} />
      <Button label="Create" primary />
    </ButtonBar>
    <ButtonBar>
      <Button label="Export" icon={<Share />} />
      <Button label="Create" primary />
    </ButtonBar>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Layout/ButtonBar/Simple',
};
