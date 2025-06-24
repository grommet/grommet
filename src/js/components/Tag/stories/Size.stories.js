import React from 'react';

import { Box, Tag, Text } from 'grommet';

export const Size = () => (
  <Box pad="large" direction="row" gap="medium" wrap>
    {['xsmall', 'small', 'medium', 'large', 'xlarge'].map((size) => (
      <Box gap="medium" align="start" key={size}>
        <Text size={size} weight="bold">
          {size}
        </Text>
        <Tag name="Name" value="Value" size={size} />
        <Tag value="Value" size={size} />
        <Tag value="Value" size={size} onRemove={() => {}} />
      </Box>
    ))}
  </Box>
);

export default {
  title: 'Type/Tag/Size',
};
