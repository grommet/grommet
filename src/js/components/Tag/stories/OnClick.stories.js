import React from 'react';

import { Box, Tag, Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from '../../../utils';

const customTheme = deepMerge(hpe, {
  tag: {
    background: 'background-contrast',
    border: {
      color: 'transparent',
    },
    hover: {
      background: 'background-contrast-hover',
    },
    round: 'small',
  },
});

export const OnClick = () => {
  const onClick = () => {};
  return (
    <Grommet theme={customTheme}>
      <Box pad="large" gap="medium" align="start">
        <Tag name="name" value="value" onClick={onClick} />
        <Tag value="value" onRemove={() => {}} />
        <Tag value="value" />
      </Box>
    </Grommet>
  );
};

OnClick.storyName = 'OnClick';

export default {
  title: 'Type/Tag/OnClick',
};
