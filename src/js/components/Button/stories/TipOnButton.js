import React from 'react';

import { Box, Button } from 'grommet';

export const TipOnButton = () => (
  <Box align="center" pad="medium" gap="large">
    <Button label="Default Tip" onClick={() => {}} tip="tooltip" />
    <Button
      label="Tip Drop props"
      onClick={() => {}}
      tip={{ dropProps: { align: { left: 'right' } }, content: 'tooltip' }}
    />
    <Button
      label="Tip content"
      onClick={() => {}}
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
    />
  </Box>
);

TipOnButton.storyName = 'Tip on button';

TipOnButton.parameters = {
  chromatic: { disable: true },
};

export default {
  title: `Controls/Button/Tip on button`,
};
