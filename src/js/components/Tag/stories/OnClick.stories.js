import React from 'react';

import { Box, Tag } from 'grommet';

export const OnClick = () => {
  const onClick = () => {};
  return (
    <Box pad="large" gap="medium" align="start">
      <Tag name="name" value="value" onClick={onClick} />
      <Tag value="value" onClick={onClick} />
    </Box>
  );
};

OnClick.storyName = 'OnClick';

export default {
  title: 'Type/Tag/OnClick',
};
