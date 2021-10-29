import React from 'react';

import { Box, Text } from 'grommet';

const alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';

export const Tip = () => (
  <Box align="center" pad="medium" gap="xlarge">
    <Box width="small">
      <Text truncate="tip">{alphabet}</Text>
    </Box>
    <Text tip={{ dropProps: { align: { left: 'right' } }, content: 'tooltip' }}>
      Tip with dropProps
    </Text>
    <Text
      tip={{
        plain: true,
        dropProps: { align: { bottom: 'top' } },
        content: (
          <Box
            pad="xxsmall"
            elevation="small"
            background="#EDEDED" // no opacity
            round="xsmall"
            margin="xsmall"
            overflow="hidden"
            align="center"
          >
            tooltip
          </Box>
        ),
      }}
    >
      Tip with content prop
    </Text>
  </Box>
);

Tip.parameters = {
  chromatic: { disable: true },
};

export default {
  title: `Type/Text/Tip`,
};
