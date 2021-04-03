import React from 'react';

import { grommet, Box, Text, Grommet } from 'grommet';

export const TipOnText = () => (
  <Grommet theme={grommet}>
    <Box align="center" width="small" pad="small">
      <Text truncate tip="a b c d e f g h i j k l m n o p q r s t u v w x y z">
        a b c d e f g h i j k l m n o p q r s t u v w x y z
      </Text>
    </Box>
    <Box align="center" pad="medium" gap="large">
      <Text
        label="Tip Drop props"
        onClick={() => {}}
        tip={{ dropProps: { align: { left: 'right' } }, content: 'tooltip' }}
      >
        Tip Drop props
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
        Tip Content
      </Text>
    </Box>
  </Grommet>
);

TipOnText.storyName = 'Tip on text';

TipOnText.parameters = {
  chromatic: { disable: true },
};

export default {
  title: `Type/Text/Tip on text`,
};
