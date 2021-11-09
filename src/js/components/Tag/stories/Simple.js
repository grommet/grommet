import React from 'react';

import { Box, Tag } from 'grommet';

export const Simple = () => {
  const onRemove = () => {};
  const onClick = () => {};
  return (
    <Box
      pad="large"
      gap="medium"
      direction="row"
      align="start"
    >
      <Box gap="medium" align="start">
        <Tag name="name" value="value" />
        <Tag
          name="name"
          value="value"
          onRemove={onRemove}
        />
        <Tag name="name" value="value" onClick={onClick} />
      </Box>
      <Box gap="medium" align="start">
        <Tag value="value" />
        <Tag value="value" onRemove={onRemove} />
        <Tag value="value" onClick={onClick} />
      </Box>
      <Box gap="medium" align="start">
        <Tag
          name="name that is much longer and may need to wrap"
          value="value"
        />
        <Tag
          name="name that is much longer and may need to wrap"
          value="value"
          onRemove={onRemove}
        />
      </Box>
    </Box>
  );
};

export default {
  title: 'Type/Tag/Simple',
};
