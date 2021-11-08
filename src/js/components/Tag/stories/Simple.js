import React from 'react';

import { Box, Grommet, Tag } from 'grommet';
// import { grommet } from 'grommet/themes';
import { hpe } from 'grommet-theme-hpe';

const theme = hpe;

export const Simple = () => {
  const onRemove = () => {};
  const onClick = () => {};
  return (
    <>
    <Grommet theme={theme}>
      <Box
        pad="large"
        gap="medium"
        direction="row"
        align="start"
      >
        <Box gap="medium" align="start">
          <Tag
            name="name that is much longer and longer and longer"
            value="value"
            onRemove={onRemove}
          />
          <Tag value="value" onRemove={onRemove} />
        </Box>
        <Box gap="medium" align="start">
          <Tag name="name" value="value" />
          <Tag name="name" value="value" onClick={onClick} />
        </Box>
        <Box gap="medium" align="start">
          <Tag value="value" onRemove={onRemove} />
        </Box>
        <Box gap="medium" align="start">
          <Tag value="value" />
          <Tag value="value" onClick={onClick} />
        </Box>
      </Box>
    </Grommet>
    <Grommet theme={theme} themeMode="dark">
    <Box
      pad="large"
      gap="medium"
      direction="row"
      align="start"
    >
      <Box gap="medium" align="start">
        <Tag 
          name="name that is much longer and longer and longer"
          value="value"
          onRemove={onRemove}
        />
        <Tag value="value" onRemove={onRemove} />
      </Box>
      <Box gap="medium" align="start">
        <Tag name="name" value="value" />
        <Tag name="name" value="value" onClick={onClick} />
      </Box>
      <Box gap="medium" align="start">
        <Tag value="value" onRemove={onRemove} />
      </Box>
      <Box gap="medium" align="start">
        <Tag value="value" />
        <Tag value="value" onClick={onClick} />
      </Box>
    </Box>
  </Grommet>
  </>
  );
};

export default {
  title: 'Type/Tag/Simple',
};
