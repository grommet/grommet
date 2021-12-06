import React from 'react';

import { Box, Tag } from 'grommet';

export const OnRemove = () => {
  const onRemove = () => {};
  return (
    <Box pad="large" gap="medium" align="start">
      <Tag name="name" value="value" onRemove={onRemove} />
      <Tag value="value" onRemove={onRemove} />
      <Tag
        name="name that is much longer and may need to wrap"
        value="value"
        onRemove={onRemove}
      />
    </Box>
  );
};

OnRemove.storyName = 'OnRemove';

export default {
  title: 'Type/Tag/OnRemove',
};
