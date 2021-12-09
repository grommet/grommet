import React from 'react';

import { Anchor, Box } from 'grommet';

const SizeAnchor = () => (
  <Box align="center" pad="large">
    {['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall', '10px'].map(
      (size) => (
        <Box key={size} margin="small">
          <Anchor size={size} label={size} href="#" />
        </Box>
      ),
    )}
  </Box>
);

export const Size = () => <SizeAnchor />;

export default {
  title: 'Controls/Anchor/Size',
};
