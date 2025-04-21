import React from 'react';
import { Anchor, Box, Paragraph } from 'grommet';

const PopoverContent = ({ ...rest }) => (
  <Paragraph margin="none" {...rest}>
    This is the content for the popover
  </Paragraph>
);

const PopoverExample = () => (
  <Box gap="medium" align="center" pad="large">

    <Anchor popover={<PopoverContent />} label="Link" />
  </Box>
);

export const Popover  = () => <PopoverExample />;
Popover.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Anchor/Popover',
};
