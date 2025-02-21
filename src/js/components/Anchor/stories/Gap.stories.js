import React from 'react';

import { Upload } from 'grommet-icons';

import { Anchor, Box } from 'grommet';

const GapAnchor = () => (
  <Box pad="medium" gap="medium">
    <Anchor icon={<Upload />} label="Small Gap" href="#" gap="small" />
    <Anchor icon={<Upload />} label="Medium Gap" href="#" gap="medium" />
    <Anchor icon={<Upload />} label="Large Gap" href="#" gap="large" />
    <Anchor icon={<Upload />} label="5px Gap" href="#" gap="5px" />
  </Box>
);

export const Gap = () => <GapAnchor />;

export default {
  title: 'Controls/Anchor/Gap',
};
